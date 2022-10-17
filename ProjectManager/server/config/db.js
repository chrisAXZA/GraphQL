import mongoose from 'mongoose'
import * as dotenv from 'dotenv';

dotenv.config();
// console.log(process.env.MONGO_URI);

const connectDB = async () => {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`DB is running on port >>> ${connection.connection.port}`.cyan.underline.bold);
};

export default connectDB;

// mongoose.connect(process.env.MONGO_URI);

// const db = mongoose.connection;
// db.on('error', console.error.bind(console.error, 'Connection error >>>'));
// db.once('open', function () {
//     console.log('DB is running on port >>> 270147');
// });

// export default db;