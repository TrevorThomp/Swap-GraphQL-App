const express = require('express');
const app = express();
const graphQLHTTP = require('express-graphql');
const schema = require('./schema/');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors())

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect('mongodb://localhost:27017/jobPost', mongooseOptions);
mongoose.connection.once('open', () => console.log('Connected to DB'))


app.get('/', (req, res) => {
  res.send('Home Page')
});

app.use('/graphql', graphQLHTTP({
  schema:schema,
  graphiql: true
}));


app.listen(3000, () => console.log('Listening on Port 3000'))