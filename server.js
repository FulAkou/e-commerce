require("dotenv").config();
const express = require("express");
const mongoDBconnexion = require("./db-connexion/connectToDb");
const databaseSeeder = require("./databaseSeeder");
const userRoute = require("./routes/UserRoutes");
const app = express();
PORT = process.env.PORT || 9000;

app.use(express.json());

//database seeder routes
app.use("/api/seed", databaseSeeder);

//routes for users
//api/users/login
app.use("/api/users", userRoute);

mongoDBconnexion();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port localhost:${process.env.PORT}`);
});
