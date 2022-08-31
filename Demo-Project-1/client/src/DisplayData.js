import React from 'react'
import { gql, useQuery } from '@apollo/client';

const QUERY_ALL_USERS = gql`
    query GetAllUsers {
        users {
            id
            name
            age
            username
        }
    }
`;

function DisplayData() {
    // useQuery hook allows ApolloClient to make call to the API. Fetches data from
    // API whenever the component renders.
    // gql statement is used in order to forumalate a GraphQL query
    const { data } = useQuery(QUERY_ALL_USERS);

    if (data){
        console.log(data);
    }

    return (
        <div></div>
    );
}

export default DisplayData;