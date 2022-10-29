import React from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useMutation } from "@apollo/client";

import { GET_PROJECTS } from "../queries/projectQueries.js";
import { DELETE_PROJECT } from "../mutations/projectMutations.js";

export default function DeleteProjectButton({ projectId }) {
    const navigate = useNavigate();

    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: { projectId },
        onCompleted: () => navigate('/'), // will be executed upon completion of given mutation
        refetchQueries: [{ query: GET_PROJECTS }],

        // update(cache, { data: { deleteProject } }) {
        //     const { projects } = cache.readQuery({ query: GET_PROJECTS });

        //     cache.writeQuery({
        //         query: GET_PROJECTS,
        //         data: { projects: projects.filter((project) => project.id !== deleteProject.id) },
        //     });
        // },
    });

    return (
        <div className="d-flex mt-5 ms-auto">
            <button className="btn btn-danger m-2" onClick={deleteProject}>
                <FaTrash className="icon" />
                Delete Project
            </button>
        </div>
    );
}