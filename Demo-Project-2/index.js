import { ApolloServer, gql } from 'apollo-server';

import { products, categories, reviews } from './data.js';

const typeDefs = gql`
    type Query {
        # Scalor Type
        hello: String
        # Object Type
        products: [Product!]!
        product(id: ID!): Product
        categories: [Category!]!
    }

    type Product {
        id: ID!
        name: String!
        description: String!
        image: String!
        quantity: Int!
        price: Float!
        onSale: Boolean!
        categoryId: ID!
    }

    type Category {
        id: ID!
        name: String!
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
        },
        products: () => {
            return products;
            // return [
            //     {
            //         name: 'Bike',
            //         description: 'Moutain Bike',
            //         quantity: 20,
            //         price: 999.99,
            //         onSale: false,
            //     },
            // ];
        },
        product: (parent, args, context) => {
            const productId = args.id;
            return products.find((p) => p.id === productId);
        },
        categories: () => {
            return categories;
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