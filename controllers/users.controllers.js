const userModel = require("../models/users.models");
const bcrypt = require("bcrypt");
const BCRYPT_SALT_ROUND = process.env.BCRYPT_SALT_ROUND;
/* Model.findAll({
    attributes: ['foo', 'bar']
  }); */
// juste renvoyer les data sans mot de passe
exports.getAllUsers = (req, res) => {
  userModel
    .findAll()
    .then((users) => res.status(200).json({ data: users }))
    .catch((err) =>
      res.status(500).json({ message: "error in DB", error: err })
    );
};

// ici ausi les autres donnees sans le mot de passe
exports.getOneUser = async (req, res) => {
  try {
    const idUser = parseInt(req.params.id);
    if (!idUser) return res.status(400).json({ message: "Missing parameter" });
    const resp = await userModel.findOne({ where: { id: idUser }, raw: true });
    if (resp === null)
      return res.status(404).json({ message: "utilisateur introuvable" });
    res.status(200).json({ data: resp });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error in DB", error: error });
  }
};
//tester si le req a des donnees et recreeer lobjet avant de save/create
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, pseudo } = req.body;
    const oneUser = {
      name,
      email,
      password,
      pseudo,
    };
    // tester si on a fournir les parametres et retourner erreur si non
    const isEmpty =
      Object.keys(oneUser).length === 0 && oneUser.constructor === Object;
    if (isEmpty) return res.status(400).json({ message: "Missing parameter" });
    if (!password || !name || !email || !pseudo)
      return res.status(400).json({ message: "Missing parameter" });

    //console.log(oneUser)
    // tester si le mail ou le pseudo sont deja attribue

    await userModel
      .findOne({ where: { email: email }, raw: true })
      .then((user) => {
        if (user !== null)
          return res.status(409).json({
            message:
              "utilisateur deja cree dans la base de donnees avec cet email",
          });
      });

    // données fournies
    // hasher le mot de passe
    bcrypt
      .hash(password, parseInt(BCRYPT_SALT_ROUND)) // .env renvoie des string
      .then(async (hash) => {
        //console.log(hash)
        oneUser.password = hash;
        const newUser = new userModel(oneUser);
        //console.log(newUser)
        const resp = await userModel.create(oneUser);
        res.status(201).json({
          message: "user crée",
          data: { name: resp.name, Email: resp.email, pseudo: pseudo.pseudo },
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: "error hashed", error: error });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error in DB", error: error });
  }
};

exports.alterUser = async (req, res) => {
  try {
    const idUser = parseInt(req.params.id);
    if (!idUser) return res.status(400).json({ message: "Missing parameter" });
    const resp = await userModel.findOne({ where: { id: idUser }, raw: true });
    if (resp === null)
      return res.status(404).json({ message: "utilisateur introuvable" });

    let oneUser = {};
    if (req.body.name) oneUser.name = req.body.name;
    if (req.body.email) oneUser.email = req.body.email;
    if (req.body.pseudo) oneUser.pseudo = req.body.pseudo;
    // if(req.body.password) oneUser.name=req.body.password

    // tester si lemqil ou le pseudo existe deja
    ///////////////////////////////// TAF
    userModel
      .update(oneUser, { where: { id: idUser } })
      .then((user) => res.status(201).json({ message: "user update" }))
      .catch((err) =>
        res.status(500).json({ message: "error de mise a jour", err: err })
      );
    res.status(200).json({ data: resp });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error in DB", error: error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const idUser = parseInt(req.params.id);
    if (!idUser) return res.status(400).json({ message: "Missing parameter" });
    const resp = await userModel.findOne({ where: { id: idUser }, raw: true });
    if (resp === null)
      return res.status(404).json({ message: "utilisateur introuvable" });
    await userModel.destroy({
      where: { id: idUser },
      //force:true /// ce parametre permettra de supprimer definitive
    });
    //res.status(200).json({ message: "user delete" });
    //on aurait mis le 204 pour dire que tout c bien passe
    res.status(204).json(); //avec le json vide
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error in DB", error: error });
  }
};

exports.restoreUser = async (req, res) => {
  try {
    const idUser = parseInt(req.params.id);
    if (!idUser) return res.status(400).json({ message: "Missing parameter" });
    const resp = await userModel.findOne({ where: { id: idUser }, raw: true });
    if (resp === null)
      return res.status(404).json({ message: "utilisateur introuvable" });
    await userModel.restore({
      where: { id: idUser },
      //force:true /// ce parametre permettra de supprimer definitive
    });
    //res.status(200).json({ message: "user delete" });
    //on aurait mis le 204 pour dire que tout c bien passe
    res.status(204).json(); //avec le json vide
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error in DB", error: error });
  }
};
