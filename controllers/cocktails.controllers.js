const cocktailModel = require("../models/cocktail.models");
// ici ausi les autres donnees sans le mot de passe
exports.getOneCocktail = async (req, res) => {
    try {
      const idUser = parseInt(req.params.id);
      if (!idUser) return res.status(400).json({ message: "Missing parameter" });
      const resp = await cocktailModel.findOne({ where: { id: idUser }, raw: true });
      if (resp === null)
        return res.status(404).json({ message: "utilisateur introuvable" });
      res.status(200).json({ data: resp });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error in DB", error: error });
    }
  };
