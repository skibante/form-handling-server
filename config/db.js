

const mongoose = require('mongoose');

const connectDB = async ()=> {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongoDB connected : ${con.connection.host}`.cyan.underline);
};

module.exports = connectDB;
