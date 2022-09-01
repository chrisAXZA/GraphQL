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
        favoriteMovies: [Movie]
    }

    type Movie {
        id: ID!
        name: String!
        yearOfPublication: Int!
        isInTheaters: Boolean!
    }

    type Query {
        users: [User!]!
        user(id: ID!): User!
        movies: [Movie!]!
        movie(name: String!): Movie!
    }

    input CreateUserInput {
        name: String!
        username: String!
        # default value of age is 18 if not provided
        # age: Int = 18
        age: Int!
        # Nationality will be not required thus other values not listed
        # in enum can be passed on
        nationality: Nationality = BRAZIL
        # when user is created friends or favoritMovies are not initiated
        # and will be created separately
        # friends: [User]
        # favoriteMovies: [Movie]
    }

    input UpdateUsernameInput {
        id: ID!
        username: String!
    }

    type Mutation {
        createUser(input: CreateUserInput!): User
        updateUsername(input: UpdateUsernameInput!): User
        deleteUser(id: ID!): User
    }

    enum Nationality {
        CANADA
        BRAZIL
        INDIA
        GERMANY
        CHILE
        RUSSIA
    }
`;
// best practice to set enum types in capital letter

// module.exports = { typeDefs };
export default typeDefs;