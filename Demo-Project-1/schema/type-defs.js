// gql allows to write pure GQL code and automatically translate
// the given code to JS compatible code
import { gql } from 'apollo-server';

// Every GraphQL schema starts with one specific type => Query, which
// will hold all of the different queries (fields) which can be executed for 
// the given API
// export const typeDefs = gql`
const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        username: String!
        age: Int!
        nationality: Nationality!
        friends: [User]
    }

    type Query {
        users: [User!]!
        user(id: ID!): User!
    }

    enum Nationality {
        CANADA
        BRAZIL
        INDIA
        GERMANY
        CHILE
    }
`;
// best practice to set enum types in capital letter

// module.exports = { typeDefs };
export default typeDefs;