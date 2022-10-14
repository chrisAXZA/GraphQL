import {
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} from "graphql";

import { clients, projects } from "../sampleData.js";

// Client Type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({ // function that returns object
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: ({ // fields will relate to query functions
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return clients;
            },
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // in the case of Mongoose, will take up Mongo function
                return clients.find((client) => client.id === args.id);
            },
        },
    }),
});

export const schema = new GraphQLSchema({
    query: RootQuery,
});