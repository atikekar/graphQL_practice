const { graphqlHTTP } = require('express-graphql'); 
const { buildSchema } = require('graphql'); 
const express = require('express');

const app = express(); 
const port = 3000; 

const schema = buildSchema(`

    type Person { 
        name: String!
        alphanumeric: String!
    }
    type Query { 
        matches_to(name: String, alphanumeric: String, Boolean: type!) : [Person]
    }
`); 

const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

const rootValue = { 
    matches_to: ({ name, alphanumeric }) => { 
        const result = data.filter(person => {
            return (person.name === name || person.alphanumeric === alphanumeric);
        });
        
        if (result.length === 0) { throw new Error('No matches found');}

        return result;
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