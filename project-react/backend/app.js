// require('dotenv').config();
const express = require("express");
const { mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
const routes = require("./routes/adminroutes");
const emproutes = require("./routes/employerRoutes");
const canRoutes=require('./routes/candidateroutes')
const cookieParser = require("cookie-parser");

const authRoute=require('./routes/candidteAuth')


app.use(cookieParser())

app.use(express.json());

app.use(
  cors({ 
    origin: "http://localhost:5174",
  })
);



app.use("/", routes);
app.use("/",authRoute)
app.use('/',emproutes);
app.use('/',canRoutes)

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
mongoose.connect("mongodb://mongodb:27017/EntryLaunch-React1");

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
