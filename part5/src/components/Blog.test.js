import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

test('<Blog /> shows title, author but not url, likes by default', () => {
    const blog = {
      likes: 3,
      author: 'Testa',
      title: 'Test Title',
      url: 'www.test.com',
      user: 'testuser',
    }

    const likeBlog = jest.fn()
    const removeBlog = jest.fn()
    
    const component = render(
        <Blog
            blog={blog}
            likeBlog={likeBlog}
            removeBlog={removeBlog}
        />
    )
    
    const titleAuthor = component.container.querySelector('.titleAuthor')
    expect(titleAuthor).not.toHaveStyle('display:none')

    expect(titleAuthor).toHaveTextContent('Test Title Testa')

    const urlLikes = component.container.querySelector('.urlLikes')
    expect(urlLikes).toHaveStyle('display:none')

})
