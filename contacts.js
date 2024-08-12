const { graphqlHTTP } = require('express-graphql'); 
const { buildSchema } = require('graphql'); 
const express = require('express');

const app = express(); 
const port = 3000; 

const schema = buildSchema(`
    type Query { 
        people_count(name: String, alphanumeric: String) : Int
    }
`); 

const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

const rootValue = { 
    people_count: ({ name, alphanumeric }) => { 
        return data.filter(person => {
            return (!name || person.name === name) && (!alphanumeric || person.alphanumeric === alphanumeric);
        }).length;
    }
}; 

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: rootValue,
    graphiql: true,
}));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/graphql`);
});