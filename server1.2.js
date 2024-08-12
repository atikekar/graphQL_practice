const { graphql, buildSchema } = require("graphql");
const express = require('express');

var app = express();
const port = 4000; 

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
    type Query {
        num_people : Int 
    }
`);
   
// The rootValue provides a resolver function for each API endpoint
const people = ['Ava', 'Bella', 'Rhys', 'Margriet', 'Hannah', 'Emma', 'Jillian', 'Olivia', 'Eshaan'];
rootValue = { 
    num_people : () => people.length 
};

app.use('/graphql', express.json());

app.post('/graphql', (req, res) => {
    const query = req.body.query;
    graphql({
        schema,
        source: query,
        rootValue
    })
});

app.get('/graphql', (req, res) => {
    const numPeople = people.length
    const formattedResponse = `number of people = ${numPeople}`;
    res.json(formattedResponse);
  });

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/graphql`);
});