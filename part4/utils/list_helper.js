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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}