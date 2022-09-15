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
        review(id: ID!): Review
        reviews: [Review!]!
    }

    type Mutation {
        # defines the return type of the given mutation
        # addCategory(name: String!): Category!
        # Input value for the given mutation
        addCategory(input: AddCategoryInput): Category!
        addProduct(input: AddProductInput): Product!
        addReview(input: AddReviewInput): Review!
        updateCategory(id: ID!, input: UpdateCategoryInput): Category
        updateProduct(id: ID!, input: UpdateProductInput): Product
        updateReview(id: ID!, input: UpdateReviewInput): Review
        deleteCategory(id: ID!): Boolean!
        deleteProduct(id: ID!): Boolean!
        deleteAllProducts: Boolean!
        deleteReview(id: ID!): Boolean!
    }

    type Product {
        id: ID!
        name: String!
        description: String!
        image: String!
        quantity: Int!
        price: Float!
        onSale: Boolean!
        categoryId: ID
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

    input AddCategoryInput {
        name: String!
    }

    input AddProductInput {
        name: String!
        description: String!
        image: String!
        quantity: Int!
        price: Float!
        onSale: Boolean!
        categoryId: ID!
        # reviews: [Review!]!
    }

    input AddReviewInput {
        title: String!
        comment: String!
        date: String!
        rating: Int!
        productId: ID!
    }

    input UpdateCategoryInput {
        name: String
    }

    input UpdateProductInput {
        name: String
        description: String
        image: String
        quantity: Int
        price: Float
        onSale: Boolean
        categoryId: ID
    }

    input UpdateReviewInput {
        title: String
        comment: String
        date: String
        rating: Int
        productId: ID
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