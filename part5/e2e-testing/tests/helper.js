
const loginWith = async (page, username, password) => {
    await page.fill('input[name="userName"]', username)
    await page.fill('input[name="password"]', password)
    await page.getByRole('button', { name: 'login' }).click()
    
}

const createBlog = async (page, content) => {
    await page.fill('input[name="title"]', `title ${content}`)
    await page.fill('input[name="author"]', `author ${content}`)
    await page.fill('input[name="url"]', `url ${content}`)
    await page.getByRole('button', { name: 'Save' }).click()
    //await page.reload()
    //await page.waitForTimeout(1000)
}

const likeBlog = async (page, blogElement, numOfLikes) => {
    for (let i = 0; i < numOfLikes; i++){
        await blogElement.getByTestId('like-button').click()
        await page.waitForTimeout(500)
        
    }
}

module.exports = {
    loginWith,
    createBlog,
    likeBlog
}