const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('unique identifier property of the blog posts is named id', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect((raw)=>{
      assert(raw.body[0].id)
    })
})

test('HTTP POST request to the /api/blogs URL successfully creates a new blog post', async () => {
  const blogsAtStart = await helper.blogsInDb()

  await api.post('/api/blogs')
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAtTheEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtTheEnd.length, blogsAtStart.length + 1)
})


test("deleting a single blog", async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
})
// test('the first note is about HTTP methods', async () => {
//   const response = await api.get('/api/notes')

//   const contents = response.body.map(e => e.content)
//   assert(contents.includes('HTML is easy'))
// })

// test('a valid note can be added ', async () => {
//   const newNote = {
//     content: 'async/await simplifies making async calls',
//     important: true,
//   }

//   await api
//     .post('/api/notes')
//     .send(newNote)
//     .expect(201)
//     .expect('Content-Type', /application\/json/)

//   const response = await api.get('/api/notes')

//   const contents = response.body.map(r => r.content)

//   assert.strictEqual(response.body.length, helper.initialNotes.length + 1)

//   assert(contents.includes('async/await simplifies making async calls'))
// })

// test('note without content is not added', async () => {
//   const newNote = {
//     important: true
//   }

//   await api
//     .post('/api/notes')
//     .send(newNote)
//     .expect(400)

//   const response = await api.get('/api/notes')

//   assert.strictEqual(response.body.length, helper.initialNotes.length)
// })

// test('a specific note can be viewed', async () => {
//   const notesAtStart = await helper.notesInDb()

//   const noteToView = notesAtStart[0]

//   const resultNote = await api
//     .get(`/api/notes/${noteToView.id}`)
//     .expect(200)
//     .expect('Content-Type', /application\/json/)

//   assert.deepStrictEqual(resultNote.body, noteToView)
//   //assert.strictEqual(JSON.stringify(resultNote.body.toString()), JSON.stringify(noteToView.toString()))
// })

// test('a note can be deleted', async () => {
//   const notesAtStart = await helper.notesInDb()
//   const noteToDelete = notesAtStart[0]

//   await api
//     .delete(`/api/notes/${noteToDelete.id}`)
//     .expect(204)

//   const notesAtEnd = await helper.notesInDb()

//   const contents = notesAtEnd.map(r => r.content)
//   assert(!contents.includes(noteToDelete.content))

//   assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
// })

after(async () => {
  await mongoose.connection.close()
})