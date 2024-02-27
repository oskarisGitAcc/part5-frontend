import { useState } from 'react'

const Blog = ({ blog, handleLike }) => {
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
        </div>
      )}
    </div>
  )
}

export default Blog