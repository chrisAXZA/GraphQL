import React from "react";

import logo from './assets/logo.png';

export default function Header() {
    return (
        <nav className="navbar-brand bg-light mb-4 p-0">
            <div className="container">
                <a className="navbar-brand" href="/"></a>
                <div className="d-flex">
                    <img src={logo} alt="logo" className="mr-2" />
                    <div>Project Management</div>
                </div>
            </div>
        </nav>
    );
}
