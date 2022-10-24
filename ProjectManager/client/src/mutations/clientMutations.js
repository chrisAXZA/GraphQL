import { gql } from '@apollo/client';

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