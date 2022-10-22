import React from "react";
// gql creates query, useQuery allows access to data (+loadingState, any errors) in given component
import { gql, useQuery } from '@apollo/client';

const GET_CLIENTS = gql`
    query getClients {
        clients {
            id
            name
            email
            phone
        }
    }
`;

export default function Clients() {
    // ApolloProvider has its own state-manager
    const { loading, error, data } = useQuery(GET_CLIENTS);

    if (loading) {
        return (
            <p style="font: bold; color: green;">Loading...</p>
        );
    }

    if (error) {
        return (
            <p style="font: bold; color: red;">Some error occurred!</p>
        );
    }

    return (
        <>
            {!loading && !error && <h1>Clients</h1>}
        </>
    );
}