import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";

// import Spinner from "./Spinner.jsx";
import { GET_CLIENTS } from "../queries/clientQueries.js";
import { GET_PROJECTS } from "../queries/projectQueries.js";
import { ADD_PROJECT } from "../mutations/projectMutations.js";

export default function AddClientModal() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('new'); // enum, thus setting key and not actual value
    const [clientId, setClientId] = useState('');

    // Retrieve clients for select options
    const { loading, error, data } = useQuery(GET_CLIENTS);

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name, description, status, clientId },
        update(cache, { data: { addProject } }) {
            const { projects } = cache.readQuery({ query: GET_PROJECTS });

            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: [...projects, addProject] },
            });
        },
    });

    const onSubmit = (e) => {
        e.preventDefault();

        if (name === '' || description === '' || clientId === '') {
            return alert('Please fill in all of the fields!');
        }

        addProject(name, description, status, clientId);

        setName('');
        setDescription('');
        setStatus('new');
        setClientId('');
    };

    if (loading) { return null; }

    if (error) {
        return (
            <p style={{ fontSize: "24px", color: "red" }}>Some error with the ClientData occurred!</p>
        );
    }

    return (
        <>
            {!loading && !error && (
                <>
                    {/* Button trigger modal */}
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#addProjectModal">
                        <div className="d-flex align-items center">
                            <FaList className="icon" />
                            <div>Add Project</div>
                        </div>
                    </button>

                    {/* Modal */}
                    <div
                        className="modal fade"
                        id="addProjectModal"
                        aria-labelledby="addProjectModalLabel"
                        aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1
                                        className="modal-title fs-5"
                                        id="addProjectModalLabel">
                                        New Project
                                    </h1>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close">
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={onSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label">Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Description</label>
                                            <textarea
                                                className="form-control"
                                                id="description"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)} >
                                            </textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Status</label>
                                            <select
                                                id="status"
                                                className="form-select"
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}>
                                                <option value="new">Not Started</option>
                                                <option value="progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Client</label>
                                            <select
                                                id="clientId"
                                                className="form-select"
                                                value={clientId}
                                                onChange={(e) => setClientId(e.target.value)}>
                                                <option value="">Select Client</option>
                                                {data.clients.map((client) => (
                                                    <option key={client.id} value={client.id}>
                                                        {client.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <button
                                            className="btn btn-primary"
                                            type="submit"
                                            data-bs-dismiss="modal">
                                            {/* data-dismiss will close modal window after data has been submitted */}
                                            Submit ProjectData
                                        </button>
                                    </form>
                                </div>
                                {/* <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal">
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary">
                                Add Client
                            </button>
                        </div> */}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}