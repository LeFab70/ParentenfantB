const db = require("../db.config");
//const userModel = db.User;
const roleModel = db.Roles;
exports.createRole = async (req, res, next) => {
  try {
    const { description_role, name_role } = req.body;
    const oneModel = {
        name_role,
      description_role,
    };

    let role = await roleModel.findOne({
      where: { name_role: name_role },
      raw: true,
    });

    if (role !== null)
      return res.status(409).json({
        message:
          "donnees deja cree dans la base de donnees avec cette information",
      });

    role = await roleModel.create(oneModel);
    res.status(201).json({
      message: "role crée",
      data: { role: role.name_role, description: role.description_role },
    });
  } catch (error) {
    // console.log(error);
    // res.status(500).json({ message: "error in DB", error: error });
    next(error);
  }
};
