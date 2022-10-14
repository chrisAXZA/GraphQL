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

// Project Type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        clientId: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: ({ // fields will relate to query functions
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // in the case of Mongoose, will take up Mongo function
                return clients.find((client) => client.id === args.id);
            },
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return clients;
            },
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return projects.find((project) => project.id === args.id);
            },
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return projects;
            },
        }
    }),
});

export const schema = new GraphQLSchema({
    query: RootQuery,
});