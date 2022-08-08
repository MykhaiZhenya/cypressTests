/// <reference types="cypress" />

describe('Our fisrt suite', () => {

    it('first test', () => {

        cy.visit('/')
        cy.contains('Aufenthaltserlaubnis').click()
        cy.get('[type="checkbox"]').check({force:true})
        cy.get('[id="buttonNext"]').click()

        //by Tag Name
        //cy.get('input')

        //by ID
        cy.get('#Vorname').type("Ievgeniia")
        cy.get('#Nachname').type("Mykhailenko")
        cy.get('#EMail').type("myewgeniya@gmail.com")


        cy.get('[id="buttonNext"]').click()
        
        //by Class name
        //cy.get('. form-control')

        //by attribute name
        //cy.get('[data-val-required]')

        //by attribute name and value
        //cy.get('[data-val-required="Das Feld muss ausgefüllt werden."]')
        cy.get('#DienstleistungGruppen_1__Dienstleistungen_0__Anzahl').select('1')
        cy.get('#buttonNext').click()

          
        cy.get('#KeineTermineGefundenAlert').then( block => {
        expect(block).to.exist  
        }) 

        cy.get('#KeineTermineGefundenAlert').should('contain', 'Leider wurde für Ihre Auswahl kein freier Termin gefunden.')

        //by Class value
        //cy.get('[class=" form-control"]')

        

        //by Tag Name and Attribute with value
        //cy.get('input[data-val-required="Das Feld muss ausgefüllt werden."]')

        //by Two different attributes
        //cy.get('[data-val-required="Das Feld muss ausgefüllt werden."][data-type="TextBox"]')

        //by Tag Name, Attribute with value, ID and Class name
        //cy.get('input[data-val-required="Das Feld muss ausgefüllt werden."]#Vorname. form-control')

        //the most recommended way by Cypress
        //cy.get('[data-cy="inputVorname"]')
    })
})

it('second test', () => {

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click({force: true})

    cy.get('[data-cy="signInbutton"]')
    cy.contains('Sign in')
    cy.contains('[status="warning"]', 'Sign in')
    cy.get('#inputEmail3')
        .parents('form')
        .find('button')
        .should('contain', 'Sign in')
        .parents('form')
        .find('nb-checkbox')
        .click()

    cy.contains('nb-card', 'Horizontal form').find('[type="email"]')    

})

it.only('then and wrap methods', () => {

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click({force: true})
    
    cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
    cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
})

