require("dotenv").config();
const express = require("express");
const mongoDBconnexion = require("./db-connexion/connectToDb");
const databaseSeeder = require("./databaseSeeder");
const app = express();
PORT = process.env.PORT || 9000;

app.use(express.json());

app.use("/api/seed", databaseSeeder);

mongoDBconnexion();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port localhost:${process.env.PORT}`);
});
