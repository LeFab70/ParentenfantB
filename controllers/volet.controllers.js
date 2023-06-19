const db = require("../db.config");
const voletModel = db.Volet;
//tester si le req a des donnees et recreeer lobjet avant de save/create

//created volets
exports.createVolet = async (req, res, next) => {
  try {
    // if (!req.body) {
    //   res.status(400).json({
    //     message: "Content can not be empty!",
    //   });
    //   return;
    // }
    if (Object.keys(req.body).length === 0) {
      console.log(req.body);
      return res.status(400).json({
        message: "Content can not be empty!",
      });
    }
    const { label_volet, description_volet } = req.body;
    const oneVolet = {
      label_volet,
      description_volet,
    };

    let volet = await voletModel.findOne({
      where: { label_volet: label_volet },
      raw: true,
    });

    if (volet !== null)
      return res.status(409).json({
        message: "volet deja cree dans la base de donnees avec ce label",
      });

    volet = await voletModel.create(oneVolet);
    res.status(201).json({
      message: "volet crée",
      data: {
        label_volet,
        description_volet,
      },
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "error in DB", error: error.message });
    //next(error);
  }
};

//display volets
exports.getAllVolets = async (req, res, next) => {
  try {
    const volets = await voletModel.findAll({
      attributes: [
        "Id_volet",
        "label_volet",
        "description_volet",
        "createdAt",
        "updatedAt",
        "deletedAt",
      ],
    });
    if (volets === null) throw new UsersError("no data");
    res.status(200).json({ data: volets });
  } catch (err) {
    res.status(500).json({ message: "error in DB", error: error.message });
  }
};

//delete volet
exports.deleteVolet = async (req, res, next) => {
  try {
    const idVolet = parseInt(req.params.id);
    console.log(idVolet);
    if (!idVolet) throw new ParametersError("Missing parameters"); //return res.status(400).json({ message: "Missing parameter" });
    let volet = await voletModel.findOne({
      where: { Id_volet: idVolet },
      raw: true,
    });
    if (volet === null)
      //throw new UsersError("data sur le volet introuvable", 0);
      return res.status(404).json({ message: "volet introuvable" });
    volet = await voletModel.destroy({
      where: { Id_volet: idVolet },
      //force:true /// ce parametre permettra de supprimer definitive
    });
    //res.status(200).json({ message: "user delete" });
    //on aurait mis le 204 pour dire que tout c bien passe
    res.status(204).json(); //avec le json vide
  } catch (error) {
    // console.log(error);
    // res.status(500).json({ message: "error in DB", error: error });
    res.status(500).json({ message: "error in DB", error: error.message });
  }
};

//alter volet
exports.alterVolet = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      //console.log(req.body);
      return res.status(400).json({
        message: "Content can not be empty!",
      });
    }
    const idVolet = parseInt(req.params.id);
    if (!idVolet) throw new ParametersError("Missing parameters"); //return res.status(400).json({ message: "Missing parameter" });
    let resp = await voletModel.findOne({
      where: { Id_volet: idVolet },
      raw: true,
    });
    if (resp === null)
      return res.status(404).json({ message: "volet introuvable" });
    //throw new UsersError("data sur l'utilisateur introuvable", 0);
    let oneVolet = {};
    if (req.body.label_volet) oneVolet.label_volet = req.body.label_volet;
    if (req.body.description_volet)
      oneVolet.description_volet = req.body.description_volet;
    // if (req.body.pseudo) oneUser.pseudo = req.body.pseudo;
    // if(req.body.password) oneUser.name=req.body.password

    // tester si lemqil ou le pseudo existe deja
    ///////////////////////////////// TAF
    //console.log(oneVolet)
    resp = await voletModel.update(oneVolet, { where: { Id_volet: idVolet } });
    //.then((user) =>
    return res.status(201).json({ data: resp, message: "volet update" });
    // .catch((err) =>
    //   res.status(500).json({ message: "error de mise a jour", err: err })
    // );
    //res.status(200).json({ data: oneUser });
  } catch (error) {
    //next(error);
    // console.log(error);
    res.status(500).json({ message: "erreur dans le systeme--valeur non permisse", error: error });
  }
};

exports.getOneVolet = async (req, res, next) => {
  try {
    const idVolet = parseInt(req.params.id);
    if (!idVolet) throw new ParametersError("Missing parameters"); //return res.status(400).json({ message: "Missing parameter" });
    let volet = await voletModel.findOne({
      where: { Id_volet: idVolet },
      raw: true,
    });
    if (volet === null)
      //throw new UsersError("data sur l'utilisateur introuvable", 0);
      return res.status(404).json({ message: "volet introuvable" });

    res.status(200).json({ data: volet });
  } catch (error) {
    res.status(500).json({ message: "error in DB", error: error });
  }
};
