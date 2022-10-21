import {
    GraphQLEnumType,
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
            // type: ClientType,
            resolve: (parent, args) => {
                // return clients.filter((client) => client.id === parent.clientId);
                // return clients.findById(parent.clientId); // find single client per project

                return ClientModel.find({ _id: parent.clientId }); // find all clients per project
                // return ClientModel.findById(parent.clientId); // find all clients per project
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
        addProject: {
            type: ProjectType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus', // name needs to be unique
                        values: {
                            'new': { value: 'Not Started' },
                            'progress': { value: 'In Progress' },
                            'completed': { value: 'Completed' },
                            // key -> corresponding value
                        },
                    }),
                    defaultValue: 'Not Started', // default value
                },
                clientId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, { name, description, status, clientId }) {
                const project = new ProjectModel({
                    name,
                    description,
                    status,
                    clientId,
                });

                return project.save();
            },
        },
        deleteProject: {
            type: ProjectType,
            args: {
                projectId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, { projectId }) {
                return ProjectModel.findByIdAndRemove(projectId);
            },
        },
        updateProject: {
            type: ProjectType,
            args: {
                projectId: { type: new GraphQLNonNull(GraphQLID) },
                // name, description optional
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatusUpdate',
                        values: {
                            'new': { value: 'Not Started' },
                            'progress': { value: 'In Progress' },
                            'completed': { value: 'Completed' },
                        },
                    }),
                },
            },
            resolve(parent, { projectId, name, description, status }) {
                return ProjectModel
                    // new: true, if not existant will create new instance of project
                    .findByIdAndUpdate(projectId, { $set: { name, description, status } }, { new: true });
            },
        },
    },
});

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation,
});