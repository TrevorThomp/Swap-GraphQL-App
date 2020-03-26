const express = require('express');
const app = express();
const graphQLHTTP = require('express-graphql');
const schema = require('./schema/')


app.get('/', (req, res) => {
  res.send('Home Page')
});

// app.use('/graphql', graphQLHTTP({

// }));


app.listen(3000, () => console.log('Listening on Port 3000'))