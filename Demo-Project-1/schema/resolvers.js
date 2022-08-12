// Resolvers are function that resolve existing
// queries for the given application, listed in the type Query
// The resolvers object will contain all of the resolver functions
// that exist in the API (calls to DB, return data to front-end, ... )
// The resolvers will first define the highest-level field inside of
// the type-defs.js file, Query for this case which will contain all of
// the resolver functions as the given sub-fields for each of the Query-type

import { UserList } from '../DummyData.js'

const resolvers = {
    Query: {
        // code will instruct GraphQL what data should be returned when 
        // given function is being executed (will execute an API call to 
        // retrieve data from the DB)
        users() {
            return UserList;
        },
    },
};

export default resolvers;
