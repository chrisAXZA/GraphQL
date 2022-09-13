import { ApolloServer } from 'apollo-server';

// const {typeDefs} = require('./schema.js');
import { typeDefs } from './schema.js';
import { Query } from './resolvers/Query.js';
import { Product } from './resolvers/Product.js';
import { Category } from './resolvers/Category.js';
// import { products, categories, reviews } from './data.js';

// const resolvers = {
//     Query: {
//         hello: () => {
//             return 'Hello World';
//         },
//         numberOfAnimals: () => {
//             return 55;
//         },
//         price: () => {
//             return 12.45;
//         },
//         isSold: () => {
//             return false;
//         },
//     },
// };

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Category,
        Product,
    },
});

server.listen()
    .then(({ url }) => {
        console.log(`Server is running at port >>> ${url}`);
    });