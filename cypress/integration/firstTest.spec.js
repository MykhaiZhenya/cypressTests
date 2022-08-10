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

it('then and wrap methods', () => {

    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click({force: true})
    
    // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
    // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')


    // cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
    // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

    
    // Jquery method
    cy.contains('nb-card', 'Using the Grid').then( firstForm => {
        const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
        const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
        // Chai assartions
        expect(emailLabelFirst).to.equal('Email')
        expect(passwordLabelFirst).to.equal('Password')


        cy.contains('nb-card', 'Basic form').then(secondForm => {
            const passwordSecondText = secondForm.find('[for="exampleInputPassword1"]').text()
            expect (passwordLabelFirst).to.equal(passwordSecondText)


            // Convert format from Jquery to cypress syntax use method "wrap"
            cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
    })
        
        
    })
})


it('invoke command', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click({force: true})

    // 1st approach
    cy.get('[for="exampleInputEmail1"]').should('contain','Email address')

    // 2nd approach
    cy.get('[for="exampleInputEmail1"]').then( label => {
        expect(label.text()).to.equal('Email address')

    // 3rd approach
    cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
        expect(text).to.equal('Email address')

    cy.contains('nb-card', 'Basic form')
        .find('nb-checkbox')
        .click()
        .find('.custom-checkbox')
        .invoke('attr', 'class')
        //.should('contain', 'checked')
        .then(classValue => {
            expect(classValue).to.contain('checked')
        }) 
        

    })
    
    })

})

it.only('assert property', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click({force: true})

    cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
        cy.wrap(input).click()
        cy.get('nb-calendar-day-picker').contains('17').click()
        cy.wrap(input).invoke('prop', 'value').should('contain', 'Aug 17, 2022')    
        
    })


} )

