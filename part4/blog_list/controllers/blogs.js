const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    const savedBlog = await blog.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id

    if (id === undefined) {
        return response.status(400).json({
            error: 'id is missing'
        })
    }

    const deletedBlog = await Blog.findByIdAndDelete(id)

    response.status(204).json(deletedBlog)
})


blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    console.log("body", body)
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
    response.status(201).json(updatedBlog)
})

module.exports = blogsRouter