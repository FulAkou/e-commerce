const mongoose = require("mongoose");

const mongoDBconnexion = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connexion à mongodb reussie");
  } catch (error) {
    console.error("Erreur lors de la connexion à MongoDB :", error.message);
  }
};

module.exports = mongoDBconnexion;
