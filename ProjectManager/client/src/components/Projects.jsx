import React from "react";
import { useQuery } from "@apollo/client";

import Spinner from "./Spinner.jsx";
import ProjectCard from "./ProjectCard.jsx";
import { GET_PROJECTS } from "../queries/projectQueries.js";

export default function Projects() {
    const { loading, error, data } = useQuery(GET_PROJECTS);

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return (
            <p style={{ fontSize: "24px", color: "red" }}>Some error with the ProjectData occurred!</p>
        );
    }

    return (
        <>
            {data.projects.length > 0 ?
                (
                    <div className="row mt-4">
                        {data.projects
                            .map((project) => (<ProjectCard key={project.id} project={project} />))}
                    </div>
                )
                : (<p>No Projects in Database</p>)
            }
        </>
    );
}