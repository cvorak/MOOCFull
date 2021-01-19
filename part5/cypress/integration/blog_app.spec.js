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