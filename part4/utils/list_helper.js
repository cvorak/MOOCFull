const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogList) => {
    return blogList
        .map(blog => blog.likes)
        .reduce((acc, item) => acc + item, 0)
}

module.exports = {
    dummy,
    totalLikes
}