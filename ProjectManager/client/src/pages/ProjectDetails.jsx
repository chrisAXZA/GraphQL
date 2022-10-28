import React from "react";
import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";

import Spinner from "../components/Spinner.jsx";
import { GET_PROJECT } from "../queries/projectQueries.js";

export default function ProjectDetails() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_PROJECT, {
        variables: { id },
    });

    if (loading) { return (<Spinner />); }

    if (error) {
        return (
            <p style={{ fontSize: "24px", color: "red" }}>Some error with the ClientData occurred!</p>
        );
    }

    return (
        <>
            {!loading && !error && (
                <div className="mx-auto w-75 card p-5">
                    <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
                        Back to Projects
                    </Link>
                    <h1>{data.project.name}</h1>
                    <p>{data.project.description}</p>
                    <hr />
                    <h5 className="mt-3">Project Status</h5>
                    <p className="lead">{data.project.status}</p>
                </div>
            )}
        </>
    );
};