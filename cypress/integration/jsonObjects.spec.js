describe('JSON onjects', () => {

    it('JSON objects', () => {
        cy.openHomePage()

        const simpleObject = {"key": "value", "key2": "value2"}

        const simpleArrayObject = ["one", "two", "three"]

        const arrayOfObjects = [{"key": "value"}, {"key2": "value2"}, {"key3": "value3"}, {"key4": "value4"}]

        const typesOfData = {"string": "this is a string", "number": 10}

        const mix = {
            "FirstName": "Ievgeniia",
            "LastName": "Mykhailenko",
            "Age": 38,
            "Students": [
            {
                "firstName": "Sara",
                "lastName": "Conor"
            },
            {
                "firstName": "Bruce",
                "lastName": "Lee"   
            }
        ]
        }

        console.log(simpleObject.key2)
        console.log(simpleObject["key2"])
        console.log(simpleArrayObject[1])
        console.log(arrayOfObjects[1].key3)
        console.log(mix.Students[0].firstName)

        const lastNameOfSecondStudent = mix.Students[1].lastName

    } )
})