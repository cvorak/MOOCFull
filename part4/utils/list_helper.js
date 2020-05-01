const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogList) => {
    return blogList
        .map(blog => blog.likes)
        .reduce((acc, item) => acc + item, 0)
}

const favoriteBlog = (blogList) => {
    let favorite

    if (blogList.length === 0) {
        return null
    }

    if (blogList.length === 1) {
        favorite = blogList[0]
    } else {
        favorite = blogList.reduce((favorite, current) => {
            if (favorite.likes > current.likes) {
                return favorite
            } else {
                return current
            }
        })
    }    

    return (({author, likes, title}) => ({author, likes, title}))(favorite)
}

const mostBlogs = (blogList) => {
    // keys are authors names and values number of blogs they have
    const authors = {}

    blogList.forEach(blog => {
        if (authors.hasOwnProperty(blog.author)) {
            authors[blog.author] ++
        } else {
            authors[blog.author] = 1
        }
    })

    let authorWithMostBlogs, numOfBlogs = 0
    for (let author in authors) {
        if (authors[author] > numOfBlogs) {
            numOfBlogs = authors[author]
            authorWithMostBlogs = author
        }
    }

    return {
        author: authorWithMostBlogs,
        blogs: numOfBlogs
    }
}

const mostBlogsWithLodash = (blogList) => {
    const authors = _.countBy(blogList, (blog) => blog.author)

    let authorWithMostBlogs, numOfBlogs = 0
    for (let author in authors) {
        if (authors[author] > numOfBlogs) {
            numOfBlogs = authors[author]
            authorWithMostBlogs = author
        }
    }

    return {
        author: authorWithMostBlogs,
        blogs: numOfBlogs
    }
}

const mostLikes = (blogList) => {
    // keys are authors names, values likes they have
    const authors = {}
    blogList.forEach(blog => {
        if (authors.hasOwnProperty(blog.author)) {
            authors[blog.author] += blog.likes
        } else {
            authors[blog.author] = blog.likes
        }
    })

    let authorWithMostLikes, numOfLikes = 0
    for (let author in authors) {
        if (authors[author] > numOfLikes) {
            numOfLikes = authors[author]
            authorWithMostLikes = author
        }
    }

    return {
        author: authorWithMostLikes,
        likes: numOfLikes
    }
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostBlogsWithLodash,
    mostLikes
}