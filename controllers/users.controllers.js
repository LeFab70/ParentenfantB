//const userModel = require("../models/users.models");
const db = require("../db.config");
const userModel = db.User;
//const roleModel = db.Roles;
const { UsersError, ParametersError } = require("../errors/customsErrors");
// juste renvoyer les data sans mot de passe
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userModel.findAll({
      attributes: [
        "id",
        "name",
        "pseudo",
        "role",
        "status",
        "createdAt",
        "updatedAt",
        "deletedAt",
      ],
    });
    if (users === null) throw new UsersError("no data");
    res.status(200).json({ data: users });
  } catch (err) {
    next(err);
  }
  //res.status(500).json({ message: "error in DB", error: err })
};

// ici ausi les autres donnees sans le mot de passe
exports.getOneUser = async (req, res, next) => {
  try {
    const idUser = parseInt(req.params.id);
    if (!idUser) throw new ParametersError("Missing parameters"); //return res.status(400).json({ message: "Missing parameter" });
    let user = await userModel.findOne({
      attributes: [
        "id",
        "name",
        "pseudo",
        "role",
        "status",
        "createdAt",
        "updatedAt",
        "deletedAt",
      ],
      where: { Id: idUser },
      raw: true,
    });
    if (user === null)
      //throw new UsersError("data sur l'utilisateur introuvable", 0);
      return res.status(404).json({ message: "utilisateur introuvable" });
    //const idUser = parseInt(req.params.Id);
    //console.log(idUser);
    //if (!idUser) throw new ParametersError("Missing parameters"); //return res.status(400).json({ message: "Missing parameter" });
    // const user = await userModel.findOne(
    //   { attributes: ["name", "pseudo", "status"] },
    //   { where: { Id: idUser }, raw: true }
    // );
    // //console.log(user)
    // if (user === null) throw new UsersError("utilisateur introuvable");
    // return res.status(404).json({ message: "utilisateur introuvable" });
    res.status(200).json({ data: user });
  } catch (error) {
    next(error);
    // console.log(error);
    //res.status(500).json({ message: "error in DB", error: error });
  }
};
//tester si le req a des donnees et recreeer lobjet avant de save/create
exports.createUser = async (req, res, next) => {
  try {
    const { name, pseudo, password, status, Id_role, role } = req.body;
    const oneUser = {
      name,
      pseudo,
      password,
      status,
      Id_role,
      role,
    };
    // tester si on a fournir les parametres et retourner erreur si non
    // const isEmpty =
    //   Object.keys(oneUser).length === 0 && oneUser.constructor === Object;
    // if (isEmpty) throw new ParametersError("Missing parameters"); //return res.status(400).json({ message: "Missing parameter" });
    // if (!password || !name || !status || !pseudo)
    //   //console.log(oneUser)
    //   //throw new ParametersError("Missing parameters");
    //   return res.status(400).json({error:error})
    //return res.status(400).json({ message: "Missing parameter" });

    // tester si le mail ou le pseudo sont deja attribue

    let user = await userModel.findOne({
      where: { pseudo: pseudo },
      raw: true,
    });

    if (user !== null)
      return res.status(409).json({
        message: "utilisateur deja cree dans la base de donnees avec ce pseudo",
      });
    // throw new UsersError(
    //   "user deja cree dans la base de donnees avec ce pseudo",
    //   1
    // );

    // données fournies
    // hasher le mot de passe
    // bcrypt
    //   .hash(password, parseInt(BCRYPT_SALT_ROUND)) // .env renvoie des string
    //   .then(async (hash) => {
    //     //console.log(hash)
    //     oneUser.password = hash;
    //const newUser = new userModel(oneUser);
    //console.log(newUser)
    user = await userModel.create(oneUser);
    res.status(201).json({
      message: "user crée",
      data: {
        name: user.name,
        status: user.status,
        pseudo: user.pseudo,
        role: user.role,
        Id_role: user.Id_role,
      },
    });
  } catch (error) {
    // console.log(error);
    // res.status(500).json({ message: "error in DB", error: error });
    next(error);
  }
};

exports.alterUser = async (req, res, next) => {
  try {
    const idUser = parseInt(req.params.id);
    if (!idUser) throw new ParametersError("Missing parameters"); //return res.status(400).json({ message: "Missing parameter" });
    let resp = await userModel.findOne({ where: { Id: idUser }, raw: true });
    if (resp === null)
      //return res.status(404).json({ message: "utilisateur introuvable" });
      throw new UsersError("data sur l'utilisateur introuvable", 0);
    let oneUser = {};
    if (req.body.name) oneUser.name = req.body.name;
    if (req.body.email) oneUser.email = req.body.email;
    if (req.body.pseudo) oneUser.pseudo = req.body.pseudo;
    //if (req.body.password) oneUser.password = req.body.password;
    //nb penser a hasher le mot de passe a nouveau
    if (req.body.status) oneUser.status = req.body.status;

    // tester si lemqil ou le pseudo existe deja
    ///////////////////////////////// TAF
    resp = await userModel.update(oneUser, { where: { Id: idUser } });
    //.then((user) =>
    return res.status(201).json({ data: resp, message: "user update" });
    // .catch((err) =>
    //   res.status(500).json({ message: "error de mise a jour", err: err })
    // );
    //res.status(200).json({ data: oneUser });
  } catch (error) {
    next(error);
    // console.log(error);
    // res.status(500).json({ message: "error in DB", error: error });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const idUser = parseInt(req.params.id);
    if (!idUser) throw new ParametersError("Missing parameters"); //return res.status(400).json({ message: "Missing parameter" });
    let user = await userModel.findOne({ where: { Id: idUser }, raw: true });
    if (user === null)
      throw new UsersError("data sur l'utilisateur introuvable", 0);
    // return res.status(404).json({ message: "utilisateur introuvable" });
    user = await userModel.destroy({
      where: { Id: idUser },
      //force:true /// ce parametre permettra de supprimer definitive
    });
    //res.status(200).json({ message: "user delete" });
    //on aurait mis le 204 pour dire que tout c bien passe
    res.status(204).json(); //avec le json vide
  } catch (error) {
    // console.log(error);
    // res.status(500).json({ message: "error in DB", error: error });
    next(error);
  }
};

exports.restoreUser = async (req, res, next) => {
  try {
    const idUser = parseInt(req.params.id);
    //console.log(idUser)
    if (!idUser) throw new ParametersError("Missing parameters"); //return res.status(400).json({ message: "Missing parameter" });
    const resp = await userModel.findOne({ where: { id: idUser }, raw: true });
    if (resp === null)
      throw new UsersError("data sur l'utilisateur introuvable", 0);
    //return res.status(404).json({ message: "utilisateur introuvable" });
    await userModel.restore({
      where: { id: idUser },
      //force:true /// ce parametre permettra de supprimer definitive
    });
    //res.status(200).json({ message: "user delete" });
    //on aurait mis le 204 pour dire que tout c bien passe
    res.status(204).json(); //avec le json vide
  } catch (error) {
    // console.log(error);
    // res.status(500).json({ message: "error in DB", error: error });
    next(error);
  }
};
