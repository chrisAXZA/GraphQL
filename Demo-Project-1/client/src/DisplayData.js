import React, { useState } from 'react'
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';

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

const GET_MOVIE_BY_NAME = gql`
    query Movie($name: String!) {
        movie(name: $name) {
            name
            yearOfPublication
        }
    }
`;

const CREATE_USER_MUTATION = gql`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            name
            username
            id
        }
    }
`;

function DisplayData() {
    const [movieSearched, setMovieSearched] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [age, setAge] = useState(0);
    const [nationality, setNationality] = useState('');

    // useQuery hook allows ApolloClient to make call to the API. Fetches data from
    // API whenever the component renders.
    // gql statement is used in order to forumalate a GraphQL query
    // refetch fetches latest data from API without the need to change the component's state
    const { data, loading, refetch } = useQuery(QUERY_ALL_USERS);
    const { data: movieData, loading: loadingMovieData, error: errorMovieData } = useQuery(QUERY_ALL_MOVIES);
    // useLazyQuery will only be triggered when given condition is being met
    // as a first argument takes up a function which will be called in order to fetch the given data 
    const [fetchMovie, { data: movieSearchData, error: movieSearchError }] = useLazyQuery(GET_MOVIE_BY_NAME);
    // returns a function
    const [createUser] = useMutation(CREATE_USER_MUTATION);

    if (loading) {
        return <h1>Data is being loaded...</h1>
    }

    // if (data) {
    //     console.log(data);
    // }

    // if (error) {
    //     console.log(error);
    // }

    // if (movieData) {
    //     console.log(movieData);
    // }

    // if (movieSearchError) {
    //     console.log(movieSearchError);
    // }

    return (
        <div>
            <div>
                <input type="text" placeholder="Name..."
                    onChange={(event => {
                        setName(event.target.value);
                    })} />
                <input type="text" placeholder="Username..."
                    onChange={(event => {
                        setUsername(event.target.value);
                    })} />
                <input type="number" placeholder="Age..."
                    onChange={(event => {
                        setAge(event.target.value);
                    })} />
                <input type="text" placeholder="Nationality..."
                    onChange={(event => {
                        setNationality(event.target.value.toUpperCase());
                    })} />
                <button
                    onClick={() => {
                        createUser({
                            variables: {
                                input: { name, username, age: Number(age), nationality, },
                            },
                        });

                        refetch();
                    }}>
                    Create New User
                </button>
            </div>

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

            <div>
                {/* whenever there is a change to the input field, pass the event and for
                each change, set the Movie state to a new value*/}
                <input
                    type="text"
                    placeholder="Over-Stellar..."
                    onChange={(event) => setMovieSearched(event.target.value)}
                />
                <button onClick={() => {
                    fetchMovie({
                        variables: {
                            name: movieSearched,
                        },
                    })
                }}>
                    Fetch Date from Movie DB
                </button>
                <div>
                    {movieSearchData && (
                        <div>
                            <h1>Movie Name: {movieSearchData.movie.name}</h1>
                            <h1>Release Year: {movieSearchData.movie.yearOfPublication}</h1>
                        </div>
                    )}
                    {movieSearchError && (
                        <div>
                            <h1>An error occurred when fetching the movie data!</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DisplayData;