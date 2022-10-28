import React from "react";

import Clients from "../components/Clients.jsx";
import Projects from "../components/Projects.jsx";
import AddClientModal from "../components/AddClientModal.jsx";
import AddProjectModal from "../components/AddProjectModal.jsx";

export default function Home() {
    return (
        <>
            <div className="d-flex gap-3 mb-4">
                <AddClientModal />
                <AddProjectModal />
            </div>
            <Projects />
            <hr />
            <Clients />
        </>
    );
}