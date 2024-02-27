import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleBlogChange = (event) => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  const createBlog = (event) => {
    event.preventDefault()
    addBlog(newBlog)
    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={createBlog}>
        <div>
          title:
          <input
            value={newBlog.title}
            name="title"
            onChange={handleBlogChange}
          />
        </div>
        <div>
          author:
          <input
            value={newBlog.author}
            name="author"
            onChange={handleBlogChange}
          />
        </div>
        <div>
          url:
          <input
            value={newBlog.url}
            name="url"
            onChange={handleBlogChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
