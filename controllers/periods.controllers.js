const db = require("../db.config");
const periodModels = db.Period;
//tester si le req a des donnees et recreeer lobjet avant de save/create

//created volets
exports.createPeriods = async (req, res, next) => {
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
    const { start_date, end_date } = req.body;
    const onePeriod = {
      start_date,
      end_date,
    };

    // let period = await periodModels.findOne({
    //   where: { start_date: start_date },
    //   raw: true,
    // });

    // if (period !== null)
    //   return res.status(409).json({
    //     message: "period deja cree dans la base de donnees avec ce label",
    //   });

    // mise jour des anciens periode a cloture oui avant lenregistrement
    await periodModels.update({ close: "oui" }, { where: { close: "non" } });
    // console.log(req.body);
    //enregistrement de la new periode
    period = await periodModels.create(onePeriod);
    res.status(201).json({
      message: "periode crée",
      data: {
        start_date,
        end_date,
      },
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "error in DB", error: error.message });
    //next(error);
  }
};

//display periods
exports.getAllPeriods = async (req, res, next) => {
  try {
    const periods = await periodModels.findAll({
      attributes: [
        "Id_period",
        "start_date",
        "end_date",
        "close",
        "createdAt",
        "updatedAt",
        "deletedAt",
      ],
    });
    if (periods === null) throw new UsersError("no data");
    res.status(200).json({ data: periods });
  } catch (err) {
    res.status(500).json({ message: "error in DB", error: error.message });
  }
};

//delete periode
exports.deletePeriod = async (req, res, next) => {
  try {
    const idVolet = parseInt(req.params.id);
    console.log(idVolet);
    if (!idVolet) throw new ParametersError("Missing parameters"); //return res.status(400).json({ message: "Missing parameter" });
    let volet = await periodModels.findOne({
      where: { Id_period: idVolet },
      raw: true,
    });
    if (volet === null)
      //throw new UsersError("data sur le volet introuvable", 0);
      return res.status(404).json({ message: "period introuvable" });
    volet = await periodModels.destroy({
      where: { Id_period: idVolet },
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

//alter period
exports.alterPeriod = async (req, res, next) => {
  console.log(req.body);

  try {
    // if (Object.keys(req.body).length === 0) {
    //   return res.status(400).json({
    //     message: "Content can not be empty!",
    //   });
    // }
    let resp = {};
    const idPeriod = parseInt(req.params.id);
    // if (!idPeriod) throw new ParametersError("Missing parameters"); //return res.status(400).json({ message: "Missing parameter" });
    // let resp = await periodModels.findOne({
    //   where: { Id_period: idPeriod },
    //   raw: true,
    // });
    // if (resp === null)
    //   return res.status(404).json({ message: "periode introuvable" });
    // //throw new UsersError("data sur l'utilisateur introuvable", 0);
    // let onePeriod = {};
    // if (req.body.start_date) onePeriod.start_date = req.body.start_date;
    // if (req.body.end_date) onePeriod.end_date = req.body.end_date;
    // if (req.body.close) onePeriod.close = req.body.close;
    // // if(req.body.password) oneUser.name=req.body.password

    // tester si lemqil ou le pseudo existe deja
    ///////////////////////////////// TAF
    //console.log(oneVolet)
    resp = await periodModels.update(
      { close: "oui" },
      {
        where: { Id_period: idPeriod },
      }
    );

    //await periodModels.update({ close: "oui" }, { where: { close: "non" } });

    //.then((user) =>
    return res.status(201).json({ data: resp, message: "periode update" });
    // .catch((err) =>
    //   res.status(500).json({ message: "error de mise a jour", err: err })
    // );
    //res.status(200).json({ data: oneUser });
  } catch (error) {
    //next(error);
    // console.log(error);
    res.status(500).json({
      message: "erreur dans le systeme--valeur non permisse",
      error: error,
    });
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
