import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'


describe('<Blog />', () => {
    let component, likeBlog, removeBlog
    

    beforeEach(() => {
        likeBlog = jest.fn()
        removeBlog = jest.fn()

        const blog = {
            likes: 3,
            author: 'Testa',
            title: 'Test Title',
            url: 'www.test.com',
            user: 'testuser',
        }

        component = render(
            <Blog
                blog={blog}
                likeBlog={likeBlog}
                removeBlog={removeBlog}
            />
        )
    })


    test('shows title, author but not url, likes by default', () => {
        const titleAuthor = component.container.querySelector('.titleAuthor')
        expect(titleAuthor).not.toHaveStyle('display:none')

        expect(titleAuthor).toHaveTextContent('Test Title Testa')

        const urlLikes = component.container.querySelector('.urlLikes')
        expect(urlLikes).toHaveStyle('display:none')
    })

    test('shows url, likes when the button is clicked', () => {
        let div = component.container.querySelector('.urlLikes')
        expect(div).toHaveStyle('display:none')

        const button = component.container.querySelector('.toggleButton')
        fireEvent.click(button)

        expect(div).not.toHaveStyle('display:none')
    })

    test('calls event handler when like button is clicked', () => {
        const likeButton = component.container.querySelector('.likeButton')
        
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(likeBlog.mock.calls).toHaveLength(2)
    })
})