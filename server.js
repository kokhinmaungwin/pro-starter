require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB connected"))
.catch(err=> console.log(err));

app.use("/api/auth", require("./routes/auth"));

app.listen(process.env.PORT, () => {
  console.log("Server running...");
});
