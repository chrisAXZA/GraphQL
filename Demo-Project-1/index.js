import { ApolloServer } from 'apollo-server';
// const { ApolloServer } = require("apollo-server");
import typeDefs from './schema/type-defs.js';
import resolvers from './schema/resolvers.js';

// TypeDefs contains the list of all of the available data + queries for the given application
// Resolvers will hold all of the functions (calls to API/Databases,...) 
// that will interact with the data contained in TypeDefs
// All of the information should be hold in the schema folder
const server = new ApolloServer({ typeDefs, resolvers });

server.listen()
    .then(({ url }) => {
        console.log(`>>> THE API IS UP AND RUNNING AT -> ${url}`);
    });