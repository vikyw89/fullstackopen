const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    const total = blogs.reduce((sum, blog) => {
        return sum + blog.likes
    }, 0)
    return total
}

const favoriteBlog = (blogs) => {
    let maxLikes = 0
    let favouriteBlog = {}

    for (let blog of blogs) {
        if (blog.likes > maxLikes) {
            maxLikes = blog.likes
            favouriteBlog = blog
        }
    }
    return favouriteBlog
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}