// gql allows to write pure GQL code and automatically translate
// the given code to JS compatible code
import { gql } from 'apollo-server';

// Every GraphQL schema starts with one specific type => Query, which
// will hold all of the different queries (fields) which can be executed for 
// the given API
const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        username: String!
        age: Int!
        nationality: String!
    }

    type Query {
        users: [User!]!
    }
`