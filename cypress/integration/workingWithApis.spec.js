/// <reference types="cypress" />

describe('Test with backend', () => {

    beforeEach('login to the app', () => {
        cy.loginToApplication()
    })

    it.only('delete a new article in a global feed', () => {
        
        const bodyRequest = {
            "article": {
                "tagList": [],
                "title": "postman",
                "description": "test",
                "body": "test"
            }
        }

        cy.get('@token').then(token => {

            cy.request({
                url: 'https://api.realworld.io/api/articles/',
                headers: {'Authorization': 'Token '+token},
                method: 'POST',
                body: bodyRequest
            }).then( response => {
                expect(response.status).to.equal(200)
            })

            cy.contains('Global Feed').click()
            cy.get('.article-preview').first().click()
            cy.get('.article-actions').contains('Delete Article').click()
        })
    })
})