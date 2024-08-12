const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const express = require('express');

const app = express();
const port = 3000;

// Define the GraphQL schema
const schema = buildSchema(`
    type Person {
        name: String!
        age: Int!
    }

    type Query {
        people(count: Int!): [Person]!
    }
`);


//Define the data structures for person and the schema
//The people array holds all my data
const people = [  
  { name: 'Ava', age: 18 },
  { name: 'Bella', age: 20 },
  { name: 'Rhys', age: 18 },
  { name: 'Margriet', age: 19 },
  { name: 'Hannah', age: 19 },
  { name: 'Andrew', age: 20 }, 
  { name: 'Olivia', age: 20 }, 
  { name: 'Emma', age: 19 },
  { name: 'Jill', age: 20 }, 
];
// Define the root resolver
const rootValue = {
  people: ({ count }) => {
    if (count > people.length) { throw new Error("Invalid Count")}
    return people.slice(0, count);
  },
};

// Use express-graphql middleware
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: rootValue,
  graphiql: true,  // Enable GraphiQL interface for testing queries in the browser
}));

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/graphql`);
});