import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog component', () => {
  let container

  beforeEach(() => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://example.com',
      likes: 10,
      user: { name: 'Test User', username: 'testuser' }
    }

    container = render(
      <Blog
        blog={blog}
        handleLike={() => {}}
        handleDelete={() => {}}
        user={{}} />
    ).container
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
})
