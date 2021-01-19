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


    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('cvorak')
            cy.get('#password').type('razorfish')
            cy.get('#login').click()

            cy.contains('Nikola Cvorovic logged in')
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('cvorak')
            cy.get('#password').type('ovoono')
            cy.get('#login').click()

            cy.contains('Wrong credentials')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'cvorak', password: 'razorfish' })
        })

        it('A blog can be created', function () {
            cy.contains('add new blog').click()
            cy.get('#title').type('test title')
            cy.get('#author').type('test author')
            cy.get('#url').type('test url')
            cy.get('#create').click()

            cy.contains('test title test author')
        })

        it('User can like a blog', function () {
            cy.createBlog({
                title: 'title',
                author: 'author',
                url: 'url'
            })
            cy.visit('http://localhost:3000')
            cy.get('.toggleButton').click()
            cy.get('.likeButton').click()

            cy.contains('likes 1')
        })

        it('User can delete his own blog', function () {
            cy.createBlog({
                title: 'title',
                author: 'author',
                url: 'url'
            })
            cy.visit('http://localhost:3000')
            cy.get('.toggleButton').click()
            cy.get('#remove').click()
            cy.should('not.contain', 'test title test author')
        })

        it('Blogs are ordered by likes descending', function() {
            cy.createBlog({
                title: 'title3',
                author: 'author3',
                url: 'url3',
                likes: 3
            })
            cy.createBlog({
                title: 'title2',
                author: 'author2',
                url: 'url2',
                likes: 2
            })
            cy.createBlog({
                title: 'title1',
                author: 'author1',
                url: 'url1',
                likes: 1
            })

            cy.visit('http://localhost:3000')
            cy.get('.titleAuthor').then(items => {
                expect(items[0]).to.contain.text('title3 author3')
                expect(items[1]).to.contain.text('title2 author2')
                expect(items[2]).to.contain.text('title1 author1')
            })
        })
    })
})