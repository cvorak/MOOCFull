import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> calls handler with the right details when a new blog is created', () => {
    const saveNewBlog = jest.fn()
    
    const component = render(
        <BlogForm saveNewBlog={saveNewBlog} />
    )

    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(titleInput, {
        target: {value: 'test title'}
    })

    fireEvent.change(authorInput, {
        target: {value: 'test author'}
    })

    fireEvent.change(urlInput, {
        target: {value: 'test url'}
    })

    fireEvent.submit(form)

    expect(saveNewBlog.mock.calls).toHaveLength(1)
    expect(saveNewBlog.mock.calls[0][0].title).toBe('test title')
    expect(saveNewBlog.mock.calls[0][0].author).toBe('test author')
    expect(saveNewBlog.mock.calls[0][0].url).toBe('test url')
})