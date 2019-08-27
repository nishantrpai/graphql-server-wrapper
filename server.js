var express = require('express');
var graphqlHTTP = require('express-graphql');
var schema = require('./schema');
const app = express();

app.use(graphqlHTTP({
    schema,
    graphiql: true,
}));
app.listen(4000);