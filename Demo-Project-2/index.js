import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
    # Query defines the way how the data is being fetched
    type Query {
        # GraphQl either returns scalor/primitive or object type of data
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => {
            return 'Hello World';
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers, });

server.listen()
    .then(({ url }) => {
        console.log(`Server is running at port >>> ${url}`);
    });