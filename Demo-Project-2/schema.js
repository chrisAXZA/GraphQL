import { gql } from "apollo-server";

// exports/require
// exports.typeDefs = gql`
export const typeDefs = gql`
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