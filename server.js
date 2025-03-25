require("dotenv").config();
const express = require("express");
const mongoDBconnexion = require("./db-connexion/connectToDb");
const app = express();
PORT = process.env.PORT || 9000;

app.use(express.json());

mongoDBconnexion();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port localhost:${process.env.PORT}`);
});
