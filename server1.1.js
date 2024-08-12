//program which returns the num elements in an array
var { graphql, buildSchema } = require("graphql")

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
    type Query {
        num_people : Int 
    }
`)
   
// The rootValue provides a resolver function for each API endpoint
const people = ['Ava', 'Bella', 'Rhys', 'Margriet', 'Hannah', 'Emma', 'Jillian', 'Olivia'];
//const num_people = people.length;
rootValue = { num_people : () => people.length }
// { key : value, key : value, ..... }


// Run the GraphQL query '{ hello }' and print out the response
graphql({
    "schema" : schema, 
    source: "{ num_people }",
    rootValue
}).then(response => {
    console.log("The array has", response, "people")
})
