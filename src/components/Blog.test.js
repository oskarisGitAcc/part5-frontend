import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('Blog component', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 10,
    user: { name: 'Test User', username: 'testuser' }
  }

  beforeEach(() => {
    render(
      <Blog
        blog={blog}
        handleLike={() => {}}
        handleDelete={() => {}}
        user={{}} />
    )
  })

  test('renders title and author by default', () => {
    const title = screen.queryByText('Test Blog', { exact: false })
    const author = screen.queryByText('Test Author', { exact: false })
    const url = screen.queryByText('http://example.com')
    const likes = screen.queryByText('Likes: 10')

    expect(title).toBeDefined()
    expect(author).toBeDefined()
    expect(url).toBeNull()
    expect(likes).toBeNull()
  })

  test('after clicking the details button, url&likes are displayed', async () => {
    let url = screen.queryByText('http://example.com')
    let likes = screen.queryByText('Likes: 10')

    expect(url).toBeNull()
    expect(likes).toBeNull()

    const button = screen.getByText('View')
    await userEvent.click(button)

    url = screen.queryByText('http://example.com')
    likes = screen.queryByText('Likes: 10')

    expect(url).toBeDefined()
    expect(likes).toBeDefined()
  })

  test('like button click calls event handler twice', async () => {
    const mockHandler = jest.fn()
    render(
      <Blog
        blog={blog}
        handleLike={mockHandler}
        handleDelete={() => {}}
        user={{}} />
    )

    const viewButtons = screen.getAllByText('View')
    const viewButton = viewButtons[viewButtons.length - 1]
    await userEvent.click(viewButton)

    const likeButton = screen.getByText('Like')

    await userEvent.click(likeButton)
    await userEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test('form calls event handler with correct details when a new blog is created', async () => {
    const mockHandler = jest.fn()

    render(<BlogForm addBlog={mockHandler} />)

    const titleInput = screen.getByPlaceholderText('type title')
    const authorInput = screen.getByPlaceholderText('type author')
    const urlInput = screen.getByPlaceholderText('type url')
    const createButton = screen.getByText('create')

    await userEvent.type(titleInput, 'New Blog Title')
    await userEvent.type(authorInput, 'New Blog Author')
    await userEvent.type(urlInput, 'http://newblog.com')

    await userEvent.click(createButton)

    expect(mockHandler.mock.calls[0][0]).toStrictEqual({
      title: 'New Blog Title',
      author: 'New Blog Author',
      url: 'http://newblog.com'
    })
  })
})
