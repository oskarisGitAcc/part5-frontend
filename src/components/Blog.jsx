import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleSubmitLike = async (event) => {
    event.preventDefault()
    handleLike(blog.id)
  }

  const handleDeleteClick = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleDelete(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>
          {showDetails ? 'Hide' : 'View'}
        </button>
      </div>
      {showDetails && (
        <div>
          <div>{blog.url}</div>
          <form onSubmit={handleSubmitLike}>
            Likes: {blog.likes} <button type="submit">Like</button>
          </form>
          <div>{blog.user.name}</div>
          {user && user.username === blog.user.username && (
            <button onClick={handleDeleteClick}>Remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog