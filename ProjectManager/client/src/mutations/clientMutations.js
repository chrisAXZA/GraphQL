import { gql } from '@apollo/client';

export const ADD_CLIENT = gql`
    mutation addClient($name: String!, $email: String!, $phone: String!) {
        addClient(name: $name, email: $email, phone: $phone, ) {
            id
            name
            email
            phone
        }
    }
`;

export const DELETE_CLIENT = gql`
    mutation deleteClient($clientId: ID!) {
        deleteClient(clientId: $clientId) {
            id
            name
            email
            phone
        }
    }
`;