import React from "react";
import { FaTrash } from 'react-icons/fa';
import { useMutation } from "@apollo/client";

import { GET_CLIENTS } from "../queries/clientQueries.js";
import { DELETE_CLIENT } from "../mutations/clientMutations.js";

export default function ClientRow({ client }) {
    // console.log(client);

    // const [deleteClient, { loading, error, data }] = useMutation(DELETE_CLIENT, {
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: { clientId: client.id },
        // refetchQueries: [{ query: GET_CLIENTS }], // increases low performance when applied to too many queries
        update(cache, { data: { deleteClient } }) {
            // const {clients} receives clientData from the cache
            // cache will update data and filter out client without making a new request (more performant)
            const { clients } = cache.readQuery({ query: GET_CLIENTS });

            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: clients.filter((client) => client.id !== deleteClient.id) },
                // filters out the deleting client's id (ClientType!)
            });
        },
    });

    // if (error) {
    //     console.log(error);
    // }

    return (
        <tr>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>
                <button className="btn btn-danger btn-sm" onClick={deleteClient}>
                    <FaTrash />
                </button>
            </td>
        </tr>
    );
}