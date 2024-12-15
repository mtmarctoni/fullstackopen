const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog, likeBlog } = require('./helper')

describe('Blog List App', () => {
    beforeEach(async ({ page, request }) => {
        // empty database through API test router
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                userName: 'mtmarctoni',
                name: 'Marc',
                password: 'sekret'
            }
        })

        await page.goto('/')
        
    })

    describe('First page', () => {
        test('has title', async ({ page }) => {
            // Expect a title "to contain" a substring.
            await expect(page).toHaveTitle("Vite + React")
        })
        
        test('front page can be opened', async ({ page }) => {
            const locator = page.getByText('Blog List App')
            await expect(locator).toBeVisible()
            await expect(page.getByText('Log in to application to view blogs')).toBeVisible()
        })
        
        test('Login form is shown', async ({ page }) => {
            const locator = page.getByText('UserName')
            await expect(locator).toBeVisible()
        })
    })

    describe('Login', () => {
        test('login form works', async ({ page }) => {
            await loginWith(page, 'mtmarctoni', 'sekret')
            const loginSucces = page.getByText('Logged in as mtmarctoni')
            await expect(loginSucces).toBeVisible()
        })
        
        test('login form fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'mtmarctoni', 'wrong')
            const loginFailed = page.getByText('Invalid username or password')
            await expect(loginFailed).toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'mtmarctoni', 'sekret')
            await page.getByRole('button', { name: 'Create new blog' }).click()

        })

        test('a new blog can be created', async ({ page }) => {
            await createBlog(page, 'playwright')
            const newBlogTitle = page.getByTestId('title playwright')
            await expect(newBlogTitle).toBeVisible()
            await expect(page.getByTestId('url')).not.toBeVisible()
            
        })

        test('a blog can be liked', async ({ page }) => {
            await createBlog(page, 'like')
            await expect(page.getByTestId('show-hide')).toBeVisible()
            await page.getByTestId('show-hide').click()
            await page.getByTestId('like-button').click()

            const likes = page.getByTestId('likes')
            await expect(likes).toContainText('1 likes')
            await expect(page.getByTestId('likes')).toBeVisible()

        })

        test('only the user of the blog can see the delete button', async ({ page }) => {
            await createBlog(page, 'test')
            await expect(page.getByTestId('url')).not.toBeVisible()            
            await page.getByTestId('show-hide').click()            
            await expect(page.getByTestId('url')).toBeVisible()            
            await expect(page.getByTestId('title test')).toContainText('added by Marc')
            await expect(page.getByTestId('delete')).toBeVisible()
            
            })
            
        
        test('a blog can be deleted', async ({ page }) => {
            await createBlog(page, 'delete')
            await expect(page.getByTestId('url')).not.toBeVisible()
            await page.getByTestId('show-hide').click()
            await expect(page.getByTestId('url')).toBeVisible()
            await expect(page.getByTestId('delete')).toBeVisible()

            // Set up dialog handler to accept the confirmation
            page.on('dialog', async (dialog) => {
                expect(dialog.type()).toContain('confirm')
                expect(dialog.message()).toContain('Remove')
                await dialog.accept()
            })
            // Click the delete button
            await page.getByTestId('delete').click()

            // Add assertions to verify the blog post was deleted
            const deletedBlogTitle = page.getByTestId('title delete')
            await expect(deletedBlogTitle).toBeVisible()
            
        })
        
        //extract the likeBlog function in helper and set logic to test the order of the blogs, first most liked ones
        describe('with many blogs', () => {
            beforeEach(async ({ page }) => {
                for (let i = 1; i <= 3; i++) {
                    await createBlog(page, `blog ${i}`)
                    await page.waitForTimeout(500)
                    const blogElement = page.getByTestId(`title blog ${i}`)
                    await blogElement.getByTestId('show-hide').click()
                    await likeBlog(page, blogElement, i*3)
                    //for (let j = 1; j < 10; j=j+2*i){
                    //    await blogElement.getByTestId('like-button').click()
                    //    await page.waitForTimeout(500)
                    //    
                    //}
                    
                }
                

            })
            
            test.only('blogs are sorted by the number of likes, first the most liked one', async ({ page }) => {
                await expect(page.getByTestId('title blog 1')).toBeVisible()
                await expect(page.getByTestId('title blog 2')).toBeVisible()
                await expect(page.getByTestId('title blog 3')).toBeVisible()

                const blogElements = await page.$$('[data-testid^="blog-"]')
                const likes = await Promise.all(blogElements.map(async (element) => {
                    const likesText = await element.$eval('[data-testid="likes"]', el => el.textContent)
                    return parseInt(likesText.match(/\d+/)[0], 10) // match a regex and as a decimal base '10'
                }))
                
                // Check if likes are in descending order
                for (let i = 1; i < likes.length; i++) {
                    expect(likes[i-1]).toBeGreaterThanOrEqual(likes[i])
                }

            })
        })
        

    })
        
})
