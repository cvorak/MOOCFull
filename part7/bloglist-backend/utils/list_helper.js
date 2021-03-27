

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, curr) => sum + curr.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((favorite, curr) => {
        if (favorite.likes < curr.likes) {
            return curr
        } else {
            return favorite
        }
    }, blogs[0])
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}