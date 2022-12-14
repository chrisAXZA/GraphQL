// Resolvers are function that resolve existing
// queries for the given application, listed in the type Query
// The resolvers object will contain all of the resolver functions
// that exist in the API (calls to DB, return data to front-end, ... )
// The resolvers will first define the highest-level field inside of
// the type-defs.js file, Query for this case which will contain all of
// the resolver functions as the given sub-fields for each of the Query-type

// import _ from 'lodash';

import { MovieList, UserList } from '../DummyData.js'

const resolvers = {
    Query: {
        // code will instruct GraphQL what data should be returned when 
        // given function is being executed (will execute an API call to 
        // retrieve data from the DB)
        users() {
            return UserList;
        },
        // Parent returns the value that has been resolved by a parent 
        // in the chain of types
        // user: (parent) => {
        // Args is the second parameter, which is an object that contains whatever
        // data is passed in the Query signature (in this case userId)
        // user: (_, args) => {
        user: (parent, args) => {
            const userId = args.id;
            return UserList.find((user) => user.id === Number(userId));
            // lodash find will take as first argument the targetObject and as a second
            // the search criteria (in this case userId)
            // const user = _.find(UserList, { id: id });
            // return user;
        },
        // Movie resolvers
        movies: () => {
            return MovieList;
        },
        movie(parent, args) {
            const movieName = args.name;
            return MovieList.find((movie) => movie.name === movieName);
        },
    },
    User: {
        favoriteMovies: () => {
            return MovieList.filter((movie) => movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010);
        },
    },
    Mutation: {
        createUser: (parent, args) => {
            const newUser = args.input;
            const lastId = UserList[UserList.length - 1].id;
            newUser.id = lastId + 1;
            UserList.push(newUser);

            return newUser;
        },
        updateUsername: (parent, args) => {
            // const userId = args.input.id;
            // const newUsername = args.input.username;
            const { id, username } = args.input;
            const user = UserList.find((user) => user.id === Number(id));

            // console.log(id, username, user);
            if (user) {
                user.username = username;
            }

            return user;
        },
        deleteUser: (parent, args) => {
            const targetId = Number(args.id);
            const index = UserList.findIndex((user) => user.id === targetId);
            UserList.splice(index,1);

            return null;
        },
    },
};

export default resolvers;
