import React from "react";
import { FaTrash } from 'react-icons/fa';
import { useMutation } from "@apollo/client";

import { DELETE_CLIENT } from "../mutations/clientMutations.js";

export default function ClientRow({ client }) {
    console.log(client, 'here');

    const [deleteClient, { loading, error, data }] = useMutation(DELETE_CLIENT, {
        variables: { clientId: client.id },
        // onError(err) {
        //     console.log(err);
        // },
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