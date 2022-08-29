import {navigateTo} from "../support/page_objects/navigationPage.js"
describe("Test with Page Objects", () => {
    beforeEach("open application", () => {
        cy.visit("/")
    })

    it("Verifies navigation across the pages", () => { 

        navigateTo.formLayoutsPage()
        navigateTo.datePickerPage()
    })
})
