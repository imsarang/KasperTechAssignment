const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config({path:'./imp.env'})
const {connectDB }= require("./connectDB")
const userRoutes = require("./routes/userRoutes")
const taskRoutes = require("./routes/taskRoutes")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const PORT = process.env.port||5000
app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials:true,
}))
connectDB()

app.use(cookieParser('EXPRESS_SESSION_SECRET'))

app.use("/api/user",userRoutes)
app.use("/api/task",taskRoutes)
app.listen(PORT,()=>{
    console.log(`Server running on Port ${PORT}`);
})

