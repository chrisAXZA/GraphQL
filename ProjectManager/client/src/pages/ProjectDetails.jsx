import React from "react";
import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";

import Spinner from "../components/Spinner.jsx";
import ClientInfo from "../components/ClientInfo.jsx";
import { GET_PROJECT } from "../queries/projectQueries.js";
import EditProjectForm from "../components/EditProjectForm.jsx";
import DeleteProjectButton from "../components/DeleteProjectButton.jsx";

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
                    <Link to="/" className="btn btn-light btn-dark btn-sm w-25 d-inline ms-auto">
                        Back to Projects
                    </Link>
                    <h1>{data.project.name}</h1>
                    <p>{data.project.description}</p>

                    <hr />

                    <h5 className="mt-3">Project Status</h5>
                    <p className="lead" style={{ color: "green" }}>{data.project.status}</p>
                    <ClientInfo client={data.project.client[0]} />

                    <EditProjectForm project={data.project} />
                    <DeleteProjectButton projectId={data.project.id} />
                    <div>
                        <br />
                    </div>
                    <hr />
                </div>
            )}
        </>
    );
};