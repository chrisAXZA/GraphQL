import cors from 'cors';
import colors from 'colors';
import express from 'express';
import * as dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';

import connectDB from './config/db.js'
import { schema } from './schema/schema.js';

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
// connect to DB
connectDB();

app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
}));

app.listen(port, console.log(`Server running on port >>> ${port}`.blue.bold));