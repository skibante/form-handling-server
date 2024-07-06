const express = require ('express');
const dotenv = require ('dotenv');
const colors = require ('colors');
const connectDB = require('./config/db');
const cors = require('cors')

// load env varables
dotenv.config({path:".env"});


//connect to the database
connectDB();

const app = express();

//middleware setup

app.use(express.json())  //body parser

app.use(cors());


//mount routes

const auth = require('./routes/auth');
app.use("/api/v1/auth", auth)



const PORT = process.env.PORT;
const server = app.listen(PORT, console.log(`SERVER RUNNING in ${process.env.NODE_ENV} MODE ON PORT ${PORT}`.yellow.bold));



// app.get('/', (req, res)=>{
//     res.send("Hello world");
// })

// app.get("/userdetails", (req, res)=>{
//     res.json({data:[{
//         name: "chief chike",
//         age: 28,
//         email: "skib@gmail.com",
//         sex: "male",
//     },
// {
//     name: "Mrs Stella",
//     age: 22,
//     email: "stellalee@gmail.com",
//     sex: "female",
// }]});
// });



// app.listen(5000);

