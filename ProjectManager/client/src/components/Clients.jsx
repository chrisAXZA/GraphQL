import React from "react";
// gql creates query, useQuery allows access to data (+loadingState, any errors) in given component
import { useQuery } from '@apollo/client';

import Spinner from "./Spinner.jsx";
import ClientRow from "./ClientRow.jsx";
import { GET_CLIENTS } from "../queries/clientQueries.js";

export default function Clients() {
    // ApolloProvider has its own state-manager
    const { loading, error, data } = useQuery(GET_CLIENTS);

    if (loading) {
        return (
            // <p style={{ fontSize: "24px", color: "green" }}>Loading...</p>
            <Spinner />
        );
    }

    if (error) {
        return (
            <p style={{ fontSize: "24px", color: "red" }}>Some error with the ClientData occurred!</p>
        );
    }

    return (
        <>
            {/* {!loading && !error && <h1 style={{color: "gray", background: "pink"}}>Clients</h1>} */}
            {!loading && !error && (
                <table className="table table-hover mt-3">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            {/* delete Button */}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.clients.map((client => {
                            return <ClientRow key={client.id} client={client} />
                        }))}
                    </tbody>
                </table>
            )}
        </>
    );
}