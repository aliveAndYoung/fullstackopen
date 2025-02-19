const router = require('express').Router()
const Blog = require('../models/blog')
const mongoose = require('mongoose')

router.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

router.post('/', async (req, res) => {
  const body = req.body

  if (!body.title || !body.url) {
    return res.status(400).json({ error: 'Title or URL missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

router.delete('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid ID format' })
  }

  const blog = await Blog.findByIdAndDelete(req.params.id)
  
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' })
  }

  res.status(204).end()
})

router.put('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid ID format' })
  }

  const { likes } = req.body
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { likes },
    { new: true, runValidators: true }
  )

  if (!updatedBlog) {
    return res.status(404).json({ error: 'Blog not found' })
  }

  res.json(updatedBlog)
})

module.exports = router
