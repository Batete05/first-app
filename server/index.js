require ('dotenv').config();
const express= require('express');
const cors= require('cors');
const connection= require('./db');
const userRoutes= require('./routes/user')
const authRouter = require('./routes/auth')
const app= express();

//databases connection
connection()

//middlewares

app.use(express.json())
app.use(cors());

//routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRouter);

const port=process.env.PORT||8090;
app.listen(port,()=>console.log(`Listening on port ${port}...`))