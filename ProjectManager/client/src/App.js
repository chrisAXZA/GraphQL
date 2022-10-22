import React from "react";
// InMemoryCache will be used in order to store client data in cache,
// in order to avoid reloading the page
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// import './index.css';
import Header from "./components/Header.jsx";
import Clients from "./components/Clients.jsx";

const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql',
    cache: new InMemoryCache(),
});

function App() {
    return (
        <>
            <ApolloProvider client={client}>
                <Header />
                <div className="container">
                    <Clients />
                </div>
            </ApolloProvider>
        </>
    );
}

export default App;