import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../.env', });

const port = process.env.PORT || 3000;
const app = express();

app.listen(port, console.log(`Server running on port >>> ${port}`));