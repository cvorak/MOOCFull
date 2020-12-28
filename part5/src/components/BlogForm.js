import React, { useState } from 'react'

const BlogForm = ({ saveNewBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        const newBlog = {
            title: title,
            url: url,
            author: author
        }

        saveNewBlog(newBlog)
        
        setUrl('')
        setAuthor('')
        setTitle('')
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                title:
      <input
                    type='text'
                    name='Title'
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
                <br></br>
      author:
      <input
                    type='text'
                    name='Author'
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                />
                <br></br>
      url:
      <input
                    type='text'
                    name='Url'
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                />
                <br></br>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default BlogForm