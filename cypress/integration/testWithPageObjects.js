import { onDatePickerPage } from "../support/page_objects/datepickerPage.js"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage.js"
import { navigateTo } from "../support/page_objects/navigationPage.js"
import { onSmartTablePage } from "../support/page_objects/smartTablePage.js"

describe('Test with Page Object', () => {

    beforeEach('open application', () => {
        cy.openHomePage()
    })
    
    it('verify navigations accross the pages', () => {
        navigateTo.formLayoutsPage()
        navigateTo.datepickerPage()
        navigateTo.smartTablePage()
        navigateTo.tooltipPage()
        navigateTo.toasterPage()
    })

    it('should submit Inline and Basic form and select tomorrow date in the calendar',() => {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Ievgeniia', 'test@test.com')
    })

    it.only('should submit Inline and Basic form and select tomorrow date in the calendar',() => {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('Ievgeniia', 'test@test.com')
        onFormLayoutsPage.submitInlineFormWithNameAndEmail('test@test.com', 'password')
        navigateTo.datepickerPage()
        onDatePickerPage.selectCommonDatepickerDateFromToday(1)
        onDatePickerPage.selectDatepickerWithRangeFromToday(7, 14)
        navigateTo.smartTablePage()
        onSmartTablePage.addNewRecordWithFirstAndLastName('Ievgeniia', 'Mykh')
        onSmartTablePage.updateAgeByFirstName('Ievgeniia', '38')
        onSmartTablePage.deleteRowByIndex(1)

    })
})