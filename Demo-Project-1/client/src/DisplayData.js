import React from 'react'
import { gql, useQuery } from '@apollo/client';

const QUERY_ALL_USERS = gql`
    query GetAllUsers {
        users {
            id
            name
            age
            username
            nationality
        }
    }
`;

const QUERY_ALL_MOVIES = gql`
    query GetAllMovies {
        movies {
            name
            yearOfPublication
            isInTheaters
        }
    }
`;

function DisplayData() {
    // useQuery hook allows ApolloClient to make call to the API. Fetches data from
    // API whenever the component renders.
    // gql statement is used in order to forumalate a GraphQL query
    const { data, loading, error } = useQuery(QUERY_ALL_USERS);
    const { data: movieData, loading: loadingMovieData, error: errorMovieData } = useQuery(QUERY_ALL_MOVIES);

    if (loading) {
        return <h1>Data is being loaded...</h1>
    }

    // if (data) {
    //     console.log(data);
    // }

    // if (error) {
    //     console.log(error);
    // }

    if (movieData){
        console.log(movieData);
    }

    return (
        <div>
            {data && data.users.map((user) => {
                return (
                    <>
                        <div>
                            <h1>Name: {user.name}</h1>
                            <h1>Username: {user.username}</h1>
                            <h1>Age: {user.age}</h1>
                            <h1>Nationality: {user.nationality}</h1>
                        </div>
                        <hr></hr>
                    </>
                );
            })}
            {movieData && movieData.movies.map((movie) => {
                return (
                    <>
                        <div>
                            <h1>Movie Name: {movie.name}</h1>
                            <h1>Release Year: {movie.yearOfPublication}</h1>
                            <h1>Is in Theaters: {movie.isInTheaters ? 'Yes' : 'No'}</h1>
                        </div>
                        <hr></hr>
                    </>
                );
            })}
        </div>
    );
}

export default DisplayData;