import { gql } from "apollo-server";

// exports/require
// exports.typeDefs = gql`
export const typeDefs = gql`
    type Query {
        # Scalor Type
        hello: String
        # Object Type
        # products: [Product!]!
        # filterParam as Object, needs to be defined as input value, can have multiple properties
        # when set to nullable (without !) does not require for the filter to be provided
        # wihtout the filter returns all of the products
        products(filter: ProductsFilterInput): [Product!]!
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
        reviews: [Review!]!
    }

    type Category {
        id: ID!
        name: String!
        # products: [Product!]!
        products(filter: ProductsFilterInput): [Product!]!
    }

    type Review {
        id: ID!
        title: String!
        comment: String!
        date: String!
        rating: Int!
        productId: ID!
    }

    input ProductsFilterInput {
        onSale: Boolean
        price: Float
        rating: Int
    }
`;

// id: "b22da5d4-6a4b-4db5-8ec3-acc228c36260",
// date: "2021-01-01",
// title: "This is bad",
// comment: "when i bought this it broke the stove",
// rating: 1,
// productId: "53a0724c-a416-4cac-ae45-bfaedce1f147",

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