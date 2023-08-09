const { DataTypes } = require("sequelize");
//const DB = require("../db.config");
const bcrypt = require("bcrypt");
const BCRYPT_SALT_ROUND = process.env.BCRYPT_SALT_ROUND;
module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      Id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
      },

      Id_role: {
        type: DataTypes.INTEGER(255),
        // allowNull: false,
        // unique: true,
        //autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(200),
        allowNull: false,
        defaultValue: "",
        validate: {
          notNull: {
            msg: "Please enter name for user",
          },
        },
      },
      pseudo: {
        type: DataTypes.STRING(200),
        allowNull: false,
        defaultValue: "",
        validate: {
          notNull: {
            msg: "Please enter pseudo for user",
          },
        },
      },
      role: {
        type: DataTypes.STRING(100),
        allowNull: false,
        //   validate: {
        //     is: /^[0-9a-f]{64}$/i,
        //    // notNull: {
        //      // msg: "Please enter your password",
        //     //}, //le mot de passe doit comprendre les chifre et lettre sur 64 caract max
        //   },
      },

      password: {
        type: DataTypes.STRING(64),
        allowNull: false,
        //   validate: {
        //     is: /^[0-9a-f]{64}$/i,
        //    // notNull: {
        //      // msg: "Please enter your password",
        //     //}, //le mot de passe doit comprendre les chifre et lettre sur 64 caract max
        //   },
      },
      status: {
        ///il ne peut y avoir qu'un seul tuteur
        type: DataTypes.STRING(10),
        allowNull: false,
        default: "actif",
        validate: {
          isIn: {
            args: [["actif", "inactif"]],
            msg: "la valeur du status de l'utilisateur doit-etre actif ou inactif",
          },

          notNull: {
            msg: "Please enter status for user",
          },
        },
      },
    },
    { paranoid: true }, // pour gerer les suppressions de données en database --permet de les stocker dans une tampon
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: true,
    }
  );
  User.beforeCreate(async (user, options) => {
    const passwordHash = await bcrypt.hash(
      user.password,
      parseInt(BCRYPT_SALT_ROUND)
    ); // .env renvoie des string
    user.password = passwordHash;
  });
  User.checkPassword = async (passwordToCheck, passwordInDb) => {
    return await bcrypt.compare(passwordToCheck, passwordInDb);
  };
  return User;
};
// User.sync()
// User.sync({force: true})
// User.sync({alter: true})

//module.exports = User; elle devient une fonction pour utiliser seqeulize
