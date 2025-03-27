require("dotenv").config();
const express = require("express");
const mongoDBconnexion = require("./db-connexion/connectToDb");
const databaseSeeder = require("./databaseSeeder");
const userRoute = require("./routes/UserRoutes");
const productRouter = require("./routes/productRoutes");
const orderRouter = require("./routes/OrderRoutes");

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Routes pour initialiser la base de données
app.use("/api/seed", databaseSeeder);

// Routes pour les utilisateurs
app.use("/api/users", userRoute);

// Routes pour les produits
app.use("/api/products", productRouter);

// Routes pour les commandes
app.use("/api/orders", orderRouter);

// Connexion à la base de données
mongoDBconnexion();

// Gestionnaire d'erreurs global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Une erreur interne est survenue !" });
});

// Démarrage du serveur
if (!process.env.PORT) {
  console.error("Erreur : Le port n'est pas défini dans le fichier .env");
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
