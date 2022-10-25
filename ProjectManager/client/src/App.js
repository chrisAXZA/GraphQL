import React from "react";
// InMemoryCache will be used in order to store client data in cache,
// in order to avoid reloading the page
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// import './index.css';
import Header from "./components/Header.jsx";
import Clients from "./components/Clients.jsx";
import Projects from "./components/Projects.jsx";
import AddClientModal from "./components/AddClientModal.jsx";

// merges incoming and existing data in cache
const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                clients: {
                    merge(existing, incoming) {
                        return incoming;
                    },
                },
                projects: {
                    merge(existing, incoming) {
                        return incoming;
                    },
                },
            },
        },
    },
});

const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql',
    // cache: new InMemoryCache(),
    cache,
});

function App() {
    return (
        <>
            <ApolloProvider client={client}>
                <Router>
                    <Header />
                    <div className="container">
                        <AddClientModal />
                        <Projects />
                        <Clients />
                    </div>
                </Router>
            </ApolloProvider>
        </>
    );
}

export default App;