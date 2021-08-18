const faker = require('faker')
const fs = require('fs')

faker.locale = 'vi';

const randomPosts = (n) => {
    const posts = []

    if (n <= 0) return []

    Array.from(new Array(n)).forEach(() => {
        const post = {
            id: faker.datatype.uuid(),
            title: faker.name.title(),
            author: faker.name.firstName()
        }
        posts.push(post)
    })

    return posts
}

const randomComments = (posts, n) => {
    const comments = []

    if (n <= 0) return []

    for (const post of posts) {
        Array.from(new Array(n)).forEach(() => {
            const comment = {
                id: faker.datatype.uuid(),
                body: faker.git.commitMessage(),
                postId: post.id
            }
            comments.push(comment)
        })
    }

    return comments
}

(() => {
    const posts = randomPosts(5)
    const comments = randomComments(posts, 5)

    const db = {
        posts: posts,
        comments: comments,
        profile: {
            name: 'Dat'
        }
    }

    fs.writeFile('db.json', JSON.stringify(db), () => {
        console.log('Write data successfully')
    })
})()