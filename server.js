var express = require('express');
var graphqlHTTP = require('express-graphql');
import schema from './schema';
const app = express();

app.use(graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);