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
    cy.get('[for="exampleInputEmail1"]')
    .should('contain','Email address')
    .should('have.class', 'label')
    .and('have.text', 'Email address')


    // 2nd approach
    cy.get('[for="exampleInputEmail1"]').then( label => {
        expect(label.text()).to.equal('Email address')
        expect(label).to.have.class('label')
        expect(label).to.have.text('Email address')

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

    function selectDayFromCurrent(){
        let date = new Date()
        date.setDate(date.getDate() + 51)
        let futureDay = date.getDate()
        let futureMonth = date.toLocaleString('default', {month: 'short'})
        let dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear()
        cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
            if(!dateAttribute.includes(futureMonth)){
                cy.get('[data-name="chevron-right"]').click()
                selectDayFromCurrent()
                } else {
                cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"').contains(futureDay).click()
            }
        })
        return dateAssert
    }
    
    cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
        cy.wrap(input).click()
        let dateAssert = selectDayFromCurrent()
        cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
        cy.wrap(input).should('have.value', dateAssert)        
    })
})

it('radio button', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click({force: true})

    cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButtons => {
        cy.wrap(radioButtons)
        .first()
        .check({force:true})
        .should('be.checked')

        cy.wrap(radioButtons)
        .eq(1)
        .check({force:true})

        cy.wrap(radioButtons)
        .eq(0)
        .should('not.be.checked')

        cy.wrap(radioButtons)
        .eq(2)
        .should('be.disabled')

    })
})

it('check boxes', () => {
    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click({force: true})

    //cy.get('[type="checkbox"]').check({force: true})
    //unselect first checkbox
    cy.get('[type="checkbox"]').eq(0).click({force: true})
    //select second checkbox
    cy.get('[type="checkbox"]').eq(1).check({force: true})

})

it('lists and dropdowns', () => {
    cy.visit('/')

    //1
    // cy.get('nav nb-select').click()
    // cy.get('.options-list').contains('Dark').click()
    // сy.get('nav nb-select').should('contain', 'Dark')
    // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

    //2
    cy.get('nav nb-select').then(dropdown => {
        cy.wrap(dropdown).click()
        cy.get('.options-list nb-option').each((listItem, index) => {
            const itemText = listItem.text().trim()

            const colors = {
                "Light":"rgb(255, 255, 255)",
                "Dark":"rgb(34, 43, 69)",
                "Cosmic":"rgb(50, 50, 89)",
                "Corporate":"rgb(255, 255, 255)"
            }

            cy.wrap(listItem).click()
            cy.wrap(dropdown).should('contain', itemText)
            cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
            if( index < 3){
                cy.wrap(dropdown).click()
            } 
            
        })

    })

})

it('Web tables', () => {
    cy.visit('/')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click({force: true})

    //1
    cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
        cy.wrap(tableRow).find('.nb-edit').click()
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
        cy.wrap(tableRow).find('.nb-checkmark').click()
        cy.wrap(tableRow).find('td').eq(6).should('contain','25')
    })
    //2
    cy.get('thead').find('.nb-plus').click()
    cy.get('thead').find('tr').eq(2).then( tableRow => {
        cy.wrap(tableRow).find('[placeholder="First Name"]').type('Ievgeniia')
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Mykhailenko')
        cy.wrap(tableRow).find('.nb-checkmark').click()
    })
    cy.get('tbody tr').first().find('td').then(tableColumns => {
        cy.wrap(tableColumns).eq(2).should('contain', 'Ievgeniia')
        cy.wrap(tableColumns).eq(3).should('contain', 'Mykhailenko')
    })

    //3
    const age = [20, 30, 40, 200]

    cy.wrap(age).each( age => {
        cy.get('thead [placeholder="Age"]').clear().type(age)
        cy.wait(500)
        cy.get('tbody tr').each(tableRow => {
            if(age == 200){
                cy.wrap(tableRow).should('contain', 'No data found')
            } else {
                cy.wrap(tableRow).find('td').eq(6).should('contain', age)
        
            }
            
    })
    })
})

    

it('tooltip', () => {
    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Tooltip').click({force: true}) 

    cy.contains('nb-card', 'Colored Tooltips')
        .contains('Default').click()
    cy.get('nb-tooltip').should('contain', 'This is a tooltip')
})

it('tooltip', () => {
    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Smart Table').click({force: true}) 

    // const stub = cy.stub()
    // cy.on('window:confirm', stub)
    // cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
    //     expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
    // })

    //Cancel Delete
    cy.get('tbody tr').first().find('.nb-trash').click()
    cy.on('window:confirm', () => false)

    })