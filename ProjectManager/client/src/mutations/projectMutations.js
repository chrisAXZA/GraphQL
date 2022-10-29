import { gql } from '@apollo/client';

export const ADD_PROJECT = gql`
    mutation addProject($name: String!, $description: String!, $status: ProjectStatus!, $clientId: ID!) {
        addProject(name: $name, description: $description, status: $status, clientId: $clientId) {
            id
            name
            description
            status
            client {
                id
                name
                email
                phone
            }
        }
    }
`;

export const UPDATE_PROJECT = gql`
    mutation updateProject($projectId: ID!, $name: String!, $description: String!, $status: ProjectStatusUpdate!) {
        updateProject(projectId: $projectId, name: $name, description: $description, status: $status) {
            id
            name
            description
            status
            client {
                id
                name
                email
                phone
            }
        }
    }
`;

export const DELETE_PROJECT = gql`
    mutation deleteProject($projectId: ID!) {
        deleteProject(projectId: $projectId) {
            id
            # name
            # description
            # status
            # clientId
        }
    }
`;