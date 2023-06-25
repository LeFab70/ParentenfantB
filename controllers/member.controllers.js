const { Sequelize } = require("sequelize");
const db = require("../db.config");
const memberModel = db.Member;
const hasMemberModel = db.HasMember;
//tester si le req a des donnees et recreeer lobjet avant de save/create
exports.createMember = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      //console.log(req.body);
      return res.status(400).json({
        message: "Content can not be empty!",
      });
    }

    const {
      Id_member,
      type_of_member,
      type_of_family,
      number_children_house,
      number_adult,
      fonction,
      card_member,
      sexe,
      lname,
      fname,
      codePostal_member,
      city_member,
      adress_member,
      email_member,
      phone_member,
      language,
      group_of_age,
      origineEthnique,
      sourceRevenue,
      level_of_school,
      family_income,
      remarks,
      how_know_us,
      autorisationPicture,
      fname_urgency,
      adresse_urgency,
      phone_urgency,
      lien_urgency,
      //email_urgency,
      // data of child
      allergies_connues,
      restrictions_foods,
      medicaments,
      eat_alone,
      rentreSeul,
      details_health,
      expirationHealth,
      numberHealth,
      health_info,
      birthday_child,
      school_child,
      autorisationDivulguerInfo,
      autorisationDivulgationDoctor,
      id_parent, //ici id du membre parent
      id_intervenant, //ici id du membre qui est intervenant

      //data conjoint
      id_conjoint, //ici id du membre qui est conjoint
    } = req.body;
    const oneMember = {
      Id_member,
      type_of_member,
      type_of_family,
      number_children_house,
      number_adult,
      fonction,
      card_member,
      sexe,
      lname,
      fname,
      codePostal_member,
      city_member,
      adress_member,
      email_member,
      phone_member,
      language,
      group_of_age,
      origineEthnique,
      sourceRevenue,
      level_of_school,
      family_income,
      remarks,
      how_know_us,
      autorisationPicture,
      fname_urgency,
      adresse_urgency,
      phone_urgency,
      lien_urgency,
      //email_urgency,
      // data of child
      allergies_connues,
      restrictions_foods,
      medicaments,
      eat_alone,
      rentreSeul,
      details_health,
      expirationHealth,
      numberHealth,
      health_info,
      birthday_child,
      school_child,
      autorisationDivulguerInfo,
      autorisationDivulgationDoctor,
      id_parent, //ici id du membre parent
      id_intervenant, //ici id du membre qui est intervenant

      //data conjoint
      id_conjoint, //ici id du membre qui est conjoint
    };
    console.log(oneMember);
    let member = await memberModel.findOne({
      where: { Id_member: Id_member, lname: lname, fname: fname },
      raw: true,
    });

    if (member !== null)
      return res.status(409).json({
        message:
          "membre deja cree dans la base de donnees avec ce nom et prenom",
      });

    member = await memberModel.create(oneMember);
    res.status(201).json({
      message: "Membre crée",
      data: {
        Id_member: member.Id_member,
        type_of_family: member.type_of_family,
        type_of_member,
        language,
        autorisationPicture,
        autorisationDivulguerInfo,
        autorisationDivulgationDoctor,
        Id_member,
        card_member,
        id_parent,
        type_of_family,
        sexe,
        lname,
        fname,
      },
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "error in DB", error: error.message });
    //next(error);
  }
};

//display periods
exports.getAllMembers = async (req, res, next) => {
  try {
    //const members = Sequelize.query(`select * from Members`);

    let members = await memberModel.findAll({
      include: {
        model: hasMemberModel,
        attributes: ["Id_period", "Id_member", "Id_volet"],
      },
    });

    // const members = await memberModel.findAll({
    //   // attribut: [Sequelize.literal(`select * from Has_members`)],
    //   include: [
    //     {
    //       model: hasMemberModel,
    //       through: {
    //         attributes: ["Id_member"],
    //       },
    //     },
    //   ],
    //   // attributes: [
    //   //   "Id_period",
    //   //   "start_date",
    //   //   "end_date",
    //   //   "close",
    //   //   "createdAt",
    //   //   "updatedAt",
    //   //   "deletedAt",
    //   // ],
    // });
    if (members === null) throw new UsersError("no data");
    res.status(200).json({ data: members });
  } catch (error) {
    res.status(500).json({ message: "error in DB", error: error.message });
  }
};
//delete member
exports.deleteMember = async (req, res, next) => {
  try {
    const idMember = (req.params.id);
    console.log(idMember)
    if (!idMember) throw new ParametersError("Missing parameters"); //return res.status(400).json({ message: "Missing parameter" });
    let member = await memberModel.findOne({
      where: {Id_member: idMember },
      raw: true,
    });
    if (member === null)
      //throw new UsersError("data sur le volet introuvable", 0);
      return res.status(404).json({ message: "member introuvable" });
    member = await memberModel.destroy({
      where: { Id_member: idMember },
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
