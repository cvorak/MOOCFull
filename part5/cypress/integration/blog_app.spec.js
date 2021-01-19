describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3000/api/testing/reset')
        const user = {
            name: 'Nikola Cvorovic',
            username: 'cvorak',
            password: 'razorfish'
        }

        cy.request('POST', 'http://localhost:3000/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('log in to application')
    })
})

describe('Login', function () {
    it('succeeds with correct credentials', function () {
        cy.get('#username').type('cvorak')
        cy.get('#password').type('razorfish')
        cy.get('#login').click()

        cy.contains('Nikola Cvorovic logged in')
    })

    it('fails with wrong credentials', function () {
        cy.get('#logout').click()
        cy.get('#username').type('cvorak')
        cy.get('#password').type('ovoono')
        cy.get('#login').click()

        cy.contains('Wrong credentials')
    })
})

describe('When logged in', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3000/api/login', {username: 'cvorak', password: 'razorfish'}).then(res => {
            window.localStorage.setItem('loggedInUser', JSON.stringify(res.body))
            cy.visit('http://localhost:3000')
        })
    })

    it('A blog can be created', function() {
        cy.contains('add new blog').click()
        cy.get('#title').type('test title')
        cy.get('#author').type('test author')
        cy.get('#url').type('test url')
        cy.get('#create').click()

        cy.contains('test title test author')
    })

    it('User can like a blog', function() {
        cy.get('.toggleButton').click()
        cy.get('.likeButton').click()

        cy.contains('likes 1')
    })

    it('User can delete his own blog', function() {
        cy.get('.toggleButton').click()
        cy.get('#remove').click()
        cy.should('not.contain', 'test title test author')
    })
})