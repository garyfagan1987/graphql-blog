const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const schema = require('./schema/schema');

const app = express();

app.use(cors());

mongoose.connect(process.env.MONGO_DB_URL);

mongoose.connection.once('open', () => {
  console.log('Connected to DB');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Listening on http://localhost:4000');
});