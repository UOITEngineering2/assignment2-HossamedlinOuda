const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const cors = require('cors');
const authRoutes = require("./Routes/authRoutes");
const blogroutes = require("./Routes/blogRoutes");

//database
const dbUrI = process.env.dbURI;
mongoose
  .connect(dbUrI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(4000))
  .catch((err) => console.log(err));

app.use(express.static("views"));
//view pages in ejs
// app.set("view engine", "ejs");
app.use(express.json());

app.use(cors());
app.get("/", (req, res) => {res.sendFile("index.html");});
app.use(authRoutes);
app.use(blogroutes);

