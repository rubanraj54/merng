const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const { MONGO_DB } = require('./config');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose.connect(MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('mongo db connected successfully and reloading good');
    return server.listen({ port: 7000 });
}).then(r => console.log('sever is running at ' + r.url))