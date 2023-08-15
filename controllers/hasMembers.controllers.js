const db = require("../db.config");
//const voletModels = require("../models/volet.models");
const hasMemberModel = db.HasMember;
const voletModel = db.Volet;
//created volets
exports.saveMemberToPeriod = async (req, res, next) => {
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
    const { Id_period, Id_member, Id_volet } = req.body;
    const oneVolet = {
      Id_period,
      Id_member,
      Id_volet,
    };

    let volet = await hasMemberModel.findOne({
      where: { Id_period: Id_period, Id_member: Id_member },
      raw: true,
    });

    if (volet !== null)
      return res.status(409).json({
        message: "Membre deja cree dans la base de donnees",
      });

    volet = await hasMemberModel.create(oneVolet);
    res.status(201).json({
      message: "membre  crée pour l'annee encours",
      data: {
        Id_period,
        Id_member,
        Id_volet,
      },
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "error in DB", error: error.message });
    //next(error);
  }
};
//display periods
exports.getAllHasMember = async (req, res, next) => {
  try {
    const hasMember = await hasMemberModel.findAll({
      attributes: ["Id_volet", "Id_period", "Id_member"],
      include: [
        {
          model: voletModel,
          attributes: ["label_volet", "description_volet"],
        },
      ],
    });
    if (hasMember === null) throw new UsersError("no data");
    res.status(200).json({ data: hasMember });
  } catch (err) {
    res.status(500).json({ message: "error in DB", error: err.message });
  }
};
