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

const mostBlogs = (blogs) => {
    const authorBlogsCount = blogs.reduce((acc, blog) => {
        if (acc[blog.author]) {
            acc[blog.author] += 1
        } else {
            acc[blog.author] = 1
        }
        return acc
    }, {})

    let maxBlogCount = 0
    let mostBlogsAuthor
    for (let author in authorBlogsCount) {
        if (authorBlogsCount[author] > maxBlogCount) {
            maxBlogCount = authorBlogsCount[author]
            mostBlogsAuthor = author
        }
    }

    return {
        author: mostBlogsAuthor,
        blogs: maxBlogCount
    }
}
const mostLikes = (blogs) => {
    const authorLikesCount = blogs.reduce((acc, blog) => {
        if (acc[blog.author]) {
            acc[blog.author] += blog.likes
        } else {
            acc[blog.author] = blog.likes
        }
        return acc
    }, {})
    
    let maxLikes = 0
    let mostLikesAuthor
    for (let author in authorLikesCount) {
        if (authorLikesCount[author] > maxLikes) {
            maxLikes = authorLikesCount[author]
            mostLikesAuthor = author
        }
    }

    return {
        author: mostLikesAuthor,
        likes: maxLikes
    }
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}