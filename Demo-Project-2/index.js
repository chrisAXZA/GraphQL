import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
    type Query {
        hello: String
        # hello: [String!]!
    }
`;

// const typeDefs = gql`
//     # Query defines the way how the data is being fetched
//     type Query {
//         # GraphQl either returns scalor/primitive or object type of data
//         hello: String
//         numberOfAnimals: Int
//         price: Float
//         isSold: Boolean
//     }
// `;

const resolvers = {
    Query: {
        hello: () => {
            return 'Hello World';
            // return ['Hello', 'World'];
        },
    },
};

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

const server = new ApolloServer({ typeDefs, resolvers, });

server.listen()
    .then(({ url }) => {
        console.log(`Server is running at port >>> ${url}`);
    });