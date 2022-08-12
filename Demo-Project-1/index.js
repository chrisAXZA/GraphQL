import { ApolloServer } from 'apollo-server'; 
// SyntaxError: Cannot use import statement outside a module
// const { ApolloServer } = require("apollo-server");

// TypeDefs contains the list of all of the available data + queries for the given application
// Resolvers will hold all of the functions (calls to API/Databases,...) 
// that will interact with the data contained in TypeDefs 
const server = new ApolloServer({ typeDefs, resolvers });

server.listen()
    .then(({ url }) => {
        console.log(`>>> THE API IS UP AND RUNNING AT -> ${url}`);
    });