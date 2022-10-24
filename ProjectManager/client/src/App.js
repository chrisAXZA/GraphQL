import React from "react";
// InMemoryCache will be used in order to store client data in cache,
// in order to avoid reloading the page
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// import './index.css';
import Header from "./components/Header.jsx";
import Clients from "./components/Clients.jsx";
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
                <Header />
                <div className="container">
                    <AddClientModal />
                    <Clients />
                </div>
            </ApolloProvider>
        </>
    );
}

export default App;