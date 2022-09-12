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
        category(id: ID!): Category
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
        category: Category
    }

    type Category {
        id: ID!
        name: String!
        products: [Product!]!
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
        category: (parent, args, context) => {
            // const categoryId = args.id;
            const { id: categoryId } = args;
            const category = categories.find((c) => c.id === categoryId);
            // const productsByCategory = products.filter((p) => p.categoryId === categoryId);
            // category.products = productsByCategory;

            return category;
        },
    },
    Category: {
        products: (parent, args, context) => {
            const { id } = parent;
            return products.filter((p) => p.categoryId === id);
        },
    },
    Product: {
        category: (parent, args, context) => {
            const { categoryId } = parent;
            return categories.find((c) => c.id === categoryId);
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