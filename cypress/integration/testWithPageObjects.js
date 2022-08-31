import { navigateTo } from "../support/page_objects/navigationPage.js"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage"
import {onDatePickerPage} from "../support/page_objects/datePickerPage"
describe("Test with Page Objects", () => {
    beforeEach("open application", () => {
        cy.openHomePage()
        // cy.visit("/")
    })

    it("Verifies navigation across the pages", () => {

        navigateTo.formLayoutsPage()
        navigateTo.datePickerPage()
        navigateTo.smartTablePage()
        navigateTo.tooltipPage()
        navigateTo.toasterPage()
    })

    it('should submit Inline and Basic form and select tomorrow date in the calendar', () => {
        navigateTo.formLayoutsPage()

        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Artem', 'test@test.com')
        onFormLayoutsPage.submitBasicFormWithEmailAndPassword('user','pass')

        navigateTo.datePickerPage()
        onDatePickerPage.selectCommonDatepickerDateFromToday(1)
        onDatePickerPage.selectDayPickerWithRangeFromToday(7,14)
    })
})
