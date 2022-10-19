import {
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} from "graphql";

import ClientModel from '../models/Client.js';
import ProjectModel from '../models/Project.js';
// import { clients, projects } from "../sampleData.js";

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
        client: {
            type: new GraphQLList(ClientType),
            resolve: (parent, args) => {
                // return clients.filter((client) => client.id === parent.clientId);
                // return clients.findById(parent.clientId); // find single client per project
                return ClientModel.find({ id: parent.clientId }); // find all clients per project
            },
        },
    }),
});

// Queries
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: ({ // fields will relate to query functions
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // in the case of Mongoose, will take up Mongo function
                // return clients.find((client) => client.id === args.id);
                return ClientModel.findById(args.id);
            },
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                // return clients;
                return ClientModel.find();
            },
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return projects.find((project) => project.id === args.id);
                return ProjectModel.findById(args.id);
            },
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                // return projects;
                return ProjectModel.find();
            },
        },
        projectsByClient: {
            type: new GraphQLList(ProjectType),
            args: { clientId: { type: GraphQLID } },
            resolve(parent, args) {
                // return projects.filter((project) => project.clientId === args.clientId);
                return ProjectModel.find({ clientId: args.clientId });
            },
        },
    }),
});

// Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addClient: {
            type: ClientType, // object that is being created
            args: { // fields that will be added to new object
                name: { type: new GraphQLNonNull(GraphQLString) }, // can not be null
                email: { type: new GraphQLNonNull(GraphQLString) }, // can not be null
                phone: { type: new GraphQLNonNull(GraphQLString) }, // can not be null
            },
            resolve(parent, args) {
                const client = new ClientModel({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });

                return client.save();
                // Alternative: ClientModel.create();
            },
        },
        deleteClient: {
            type: ClientType,
            args: {
                clientId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, { clientId }) {
                return ClientModel.findByIdAndRemove(clientId);
            },
        },
    },
});

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation,
});