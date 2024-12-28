const initialBlogsJSON = [
    {
        _id: '673e1f6ee3146ab1535b4b72',
        title: 'first test',
        author: 'mtmarctoni',
        url: 'https://www.example.com',
        likes: 100,
        __v: 0,
        user: '674996218cac320ca2223462',
    },
    {
        _id: '673e2305dda8691324faf36c',
        title: 'second test',
        author: 'mtmarctoni',
        url: 'https://www.example.com',
        likes: 10,
        __v: 0,
        user: '674996218cac320ca2223462',
    },
    {
        _id: '673e2573f9e82219672dca67',
        title: 'third test',
        author: 'yulfax',
        url: 'https://www.example.com',
        likes: 30,
        __v: 0,
        user: '674996218cac320ca2223463',
    },
]

const initialUsersJSON = [
    {
        _id: '674996218cac320ca2223462',
        userName: 'mtmarctoni',
        name: 'marc',
        passwordHash:
            '$2b$10$M0yDbujfdvkfiQh2WNJhv.cNFG3LdXRZGau2Pao7J5RxGH90pGxgi',
    },
    {
        _id: '674996218cac320ca2223463',
        userName: 'yulfax',
        name: 'Yolanda',
        passwordHash:
            '$2b$10$8HclDqmQKQp1w2tcAt5zm.Q81TpMjsuZFipZMVwbBsdHxFb2zoVgO',
    },
]

const initialBlogsPlaywright = [
    {
        title: 'third test',
        author: 'some author',
        url: 'https://www.example.com',
        likes: 30,
    },
]

module.exports = {
    initialBlogsJSON,
    initialUsersJSON,
    initialBlogsPlaywright,
}
