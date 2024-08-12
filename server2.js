const { graphql, buildSchema } = require("graphql");
const express = require("express"); 

var app = express(); 
const port = 3000; 

const schema = buildSchema (`
    type Person {
      name: String! 
      age: Int!
    }

    type Query { 
      people: [Person]!
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
];

const rootValue = {
    people: () => people,
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
    res.json({ people });
});

app.listen(port, () => { 
    console.log(`Server running at http://localhost:${port}/graphql`);
});