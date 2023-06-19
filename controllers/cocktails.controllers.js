// //const cocktailModel = require("../models/cocktail.models");
// const { User } = require("../db.config");
// const db = require("../db.config");
// const cocktailModel = db.Cocktails;

// // ici ausi les autres donnees sans le mot de passe
// const { CocktailError, ParametersError } = require("../errors/customsErrors");
// exports.getAllCocktails = async (req, res, next) => {
//   try {
//     const cocktails = await cocktailModel.findAll({
//       paranoid: false,
//       include: { model: User, attributes: ["id", "name", "email"] },
//       raw: true,
//       attributes: ["id", "IdUser", "name", "recette", "details"],
//     });
//     if (cocktails === null) throw new cocktailError("no data");
//     //res.status(401).json({ message: "no data" });
//     res.status(200).json({ data: cocktails });
//   } catch (error) {
//     next(error);
//   }
// };

// exports.getOneCocktail = async (req, res, next) => {
//   try {
//     const id = parseInt(req.params.id);
//     if (!id) throw new ParametersError("Missing parameters");
//     // ici on gere l'erreur de maniere centralise sans plus passer par le res
//     //return res.status(400).json({ message: "Missing parameter" });
//     const cocktail = await cocktailModel.findOne({
//       where: { id: id },
//       include: { model: User, attributes: ["id", "name", "email"] },
//       attributes: ["id", "IdUser", "name", "recette", "details"],
//       raw: true,
//     });
//     if (cocktail === null)
//       throw new CocktailError("this cocktail does not exist!", 0);
//     // return res.status(404).json({ message: "data sur le cocktail introuvable" });

//     res.status(200).json({ data: cocktail });
//   } catch (error) {
//     next(error);
//     //res.status(500).json({ message: "error in DB", error: error });
//   }
// };

// exports.createCocktail = async (req, res, next) => {
//   try {
//     const { IdUser, name, details, recette } = req.body;
//     const oneCocktail = {
//       IdUser,
//       name,
//       details,
//       recette,
//     };
//     // tester si on a fournir les parametres et retourner erreur si non
//     const isEmpty =
//       Object.keys(oneCocktail).length === 0 &&
//       oneCocktail.constructor === Object;
//     if (isEmpty) throw new ParametersError("Missing parameters"); //  return res.status(400).json({ message: "Missing parameter" });
//     if (!IdUser || !name || !details || !recette)
//       throw new ParametersError("Missing parameters");
//     //return res.status(400).json({ message: "Missing parameter" });

//     //console.log(oneCocktail);
//     // tester si le mail ou le pseudo sont deja attribue

//     let cocktail = await cocktailModel.findOne({
//       where: { name: name },
//       raw: true,
//     });

//     if (cocktail !== null)
//       throw new CocktailError(
//         "cocktail deja cree dans la base de donnees avec ce nom",
//         1
//       );
//     // return res.status(409).json({
//     //   message: "cocktail deja cree dans la base de donnees avec ce nom",
//     // });

//     cocktail = await cocktailModel.create(oneCocktail);
//     res.status(201).json({
//       message: "cocktail crée",
//       data: cocktail,
//     });
//   } catch (error) {
//     next(error);
//     //console.log(error);
//     //res.status(500).json({ message: "error in DB", error: error });
//   }
// };

// exports.alterCocktail = async (req, res, next) => {
//   try {
//     const id = parseInt(req.params.id);
//     if (!id) throw new ParametersError("Missing parameters"); //return res.status(400).json({ message: "Missing parameter" });
//     let cocktail = await cocktailModel.findOne({
//       where: { id: id },
//       raw: true,
//     });
//     if (cocktail === null)
//       throw new CocktailError("data sur le cocktail introuvable", 0);
//     // return res
//     //   .status(404)
//     //   .json({ message: "data sur le cocktail introuvable" });

//     let cocktailToUpdate = {};
//     if (req.body.name) cocktailToUpdate.name = req.body.name;
//     if (req.body.details) cocktailToUpdate.details = req.body.details;
//     if (req.body.recette) cocktailToUpdate.recette = req.body.recette;

//     cocktail = await cocktailModel.update(cocktailToUpdate, {
//       where: { id: id },
//     });
//     return res
//       .status(200)
//       .json({ message: "cocktail updated", data: cocktailToUpdate });
//   } catch (error) {
//     next(error);
//     //res.status(500).json({ message: "error in DB", error: error });
//   }
// };
// exports.deleteCocktail = async (req, res, next) => {
//   try {
//     const id = parseInt(req.params.id);
//     if (!id) throw new ParametersError("Missing parameters"); //return res.status(400).json({ message: "Missing parameter" });
//     const resp = await cocktailModel.findOne({ where: { id: id }, raw: true });
//     if (resp === null)
//       throw new CocktailError("data sur le cocktail introuvable", 0);
//     //return res.status(404).json({ message: "cocktail introuvable" });
//     await cocktailModel.destroy({
//       where: { id: id },
//       //force:true /// ce parametre permettra de supprimer definitive
//     });
//     //res.status(200).json({ message: "user delete" });
//     //on aurait mis le 204 pour dire que tout c bien passe
//     res.status(204).json(); //avec le json vide
//   } catch (error) {
//     next(error);
//     // console.log(error);
//     // res.status(500).json({ message: "error in DB", error: error });
//   }
// };

// exports.restoreCocktail = async (req, res, next) => {
//   try {
//     const id = parseInt(req.params.id);
//     //console.log(idUser)
//     if (!id) throw new ParametersError("Missing parameters"); //return res.status(400).json({ message: "Missing parameter" });
//     const resp = await cocktailModel.findOne({ where: { id: id }, raw: true });
//     if (resp === null)
//       throw new CocktailError("data sur le cocktail introuvable", 0);
//     //return res.status(404).json({ message: "cocktail introuvable" });
//     await cocktailModel.restore({
//       where: { id: id },
//       //force:true /// ce parametre permettra de supprimer definitive
//     });
//     //res.status(200).json({ message: "user delete" });
//     //on aurait mis le 204 pour dire que tout c bien passe
//     res.status(204).json(); //avec le json vide
//   } catch (error) {
//     // console.log(error);
//     // res.status(500).json({ message: "error in DB", error: error });
//     next(error);
//   }
// };
