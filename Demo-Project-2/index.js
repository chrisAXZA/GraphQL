import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
    type Query {
        # Scalor Type
        hello: String
        # Object Type
        products: [Product!]!
    }

    type Product {
        name: String!
        description: String!
        quantity: Int!
        price: Float!
        onSale: Boolean!
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
        products: () => {
            return [
                {
                    name: 'Bike',
                    description: 'Moutain Bike',
                    quantity: 20,
                    price: 999.99,
                    onSale: false,
                },
            ];
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