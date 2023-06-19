const db = require("../db.config");
const hasMemberModel = db.HasMember;
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
        message: "Membre deja cree dans la base de donnees avec ce label",
      });

    volet = await hasMemberModel.create(oneVolet);
    res.status(201).json({
      message: "membre  crée pour lannee encours",
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
