require("dotenv").config();
const express = require("express")
const dbconnect = require("./dbConnection");
const userRoutes = require("./src/routes/userRoutes")
const interviewRoutes = require("./src/routes/interviewRoutes")
const cookieParser = require("cookie-parser");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


dbconnect();

app.use("/auth",userRoutes)
app.use("/interview",interviewRoutes)
app.listen(3000,()=>{
    console.log("server statred...")
})