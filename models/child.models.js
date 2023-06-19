// const { DataTypes } = require("sequelize");
// //const sequelize = require("../db.config");
// //const DB = require("../db.config");

// module.exports = (sequelize) => {
//   const Child = sequelize.define(
//     "Child",
//     {
//       Id_child: {
//         type: DataTypes.INTEGER(255),
//         primaryKey: true,
//         autoIncrement: true,
//       },

//       fname: {
//         type: DataTypes.STRING(200),
//         allowNull: false,
//         validate: {
//           notNull: {
//             msg: `fournir le nom de la personne`,
//           },
//           notEmpty: {
//             msg: `fournir le nom de la personne`,
//           },
//         },
//       },
//       lname: {
//         type: DataTypes.STRING(200),
//         allowNull: false,
//         validate: {
//           notNull: {
//             msg: `fournir le nom de la personne `,
//           },
//           notEmpty: {
//             msg: `fournir le prenom de la personne`,
//           },
//         },
//       },

//       level: {
//         type: DataTypes.STRING(200),
//         allowNull: false,
//         validate: {
//           notNull: {
//             msg: `fournir le niveau scolaire de la personne `,
//           },
//           notEmpty: {
//             msg: `fournir le niveau scolaire  de la personne`,
//           },
//         },
//       },

//       birthday: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         isDate: true,
//         validate: {
//           notNull: {
//             msg: `fournir la date de naissance`,
//           },
//           customValidator(value) {
//             if (new Date(value) > new Date()) {
//               throw new Error("invalid date");
//             }
//           },
//         },
//       },

//       numberHealth: {
//         type: DataTypes.STRING(200),
//         allowNull: false,
//         validate: {
//           notNull: {
//             msg: `fournir la carte sante`,
//           },
//           notEmpty: {
//             msg: `fournir la carte sante`,
//           },
//         },
//       },

//       expirationHealth: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         isDate: true,
//         validate: {
//           notNull: {
//             msg: `fournir la date de expiration de la carte sante`,
//           },
//           customValidator(value) {
//             if (new Date(value) > new Date()) {
//               throw new Error("invalid date");
//             }
//           },
//         },
//       },

//       sexe: {
//         type: DataTypes.STRING(20),
//         allowNull: false,
//         defaultValue: "M",
//         validate: {
//           isIn: {
//             args: ["F", "M"],

//             msg: "le doit-etre M ou F",
//           },
//         },
//       },

//       rentreSeul: {
//         type: DataTypes.STRING(20),
//         allowNull: false,
//         defaultValue: "non",
//         validate: {
//           isIn: {
//             args: ["non", "oui"],

//             msg: "Precisez si oui ou non il doit rentrer seul",
//           },
//         },
//       },

//       autorisationPicture: {
//         type: DataTypes.STRING(20),
//         allowNull: false,
//         defaultValue: "non",
//         validate: {
//           isIn: {
//             args: ["non", "oui"],

//             msg: "autorisationPicture oui ou non?",
//           },
//         },
//       },

//       autorisationDivulguerInfo: {
//         type: DataTypes.STRING(20),
//         allowNull: false,
//         defaultValue: "non",
//         validate: {
//           isIn: {
//             args: ["non", "oui"],

//             msg: "autorisationDivulguerInfo oui ou non?",
//           },
//         },
//       },

//       autorisationDivulgationDoctor: {
//         type: DataTypes.STRING(20),
//         allowNull: false,
//         defaultValue: "non",
//         validate: {
//           isIn: {
//             args: ["non", "oui"],

//             msg: "autorisationDivulgationDoctor oui ou non?",
//           },
//         },
//       },

//       autorisationDivulgationSchool: {
//         type: DataTypes.STRING(20),
//         allowNull: false,
//         defaultValue: "non",
//         validate: {
//           isIn: {
//             args: ["non", "oui"],

//             msg: "autorisationDivulgationSchool oui ou non?",
//           },
//         },
//       },

//       volet: {
//         type: DataTypes.STRING(200),
//         allowNull: false,
//         defaultValue: "",
//         validate: {
//           isIn: {
//             args: ["BBK", "PE", "CC", "EA", "AD"],

//             msg: "le volet  ne correspond pas au choix de la liste",
//           },
//         },
//       },
   

//     autorization_picture: {
//       type: DataTypes.STRING(10),
//       allowNull: false,
//       validate: {
//         isIn: {
//           args: [["oui", "non"]],
//           msg: "la valeur du statut doit-etre oui ou non",
//         },
//         notNull: {
//           msg: `renseignez sur l'autorisation de prendre des photos ou non`,
//         },
//       },
//     },

//     health_info: {
//       type: DataTypes.STRING(10),
//       allowNull: false,
//       validate: {
//         isIn: {
//           args: [["oui", "non"]],
//           msg: "la valeur des infos sur la sante doit-etre fournie",
//         },
//         notNull: {
//           msg: `renseignez sur la sante`,
//         },
//       },
//     },

//     details_health: {
//       type: DataTypes.STRING(200),
//       allowNull: true,
//       // validate: {
//       //   notNull: {
//       //     msg: `fournir le nom de la personne A contacter en cas d'urgence`
//       //   }
//       // }
//     },

//     allergies_connues: {
//       type: DataTypes.STRING(200),
//       allowNull: true,
//       // validate: {
//       //   notNull: {
//       //     msg: `fournir le nom de la personne A contacter en cas d'urgence`
//       //   }
//       // }
//     },
//     restrictions_foods: {
//       type: DataTypes.STRING(200),
//       allowNull: true,
//       // validate: {
//       //   notNull: {
//       //     msg: `fournir le nom de la personne A contacter en cas d'urgence`
//       //   }
//       // }
//     },
//     medicaments: {
//       type: DataTypes.STRING(200),
//       allowNull: true,
//       // validate: {
//       //   notNull: {
//       //     msg: `fournir le nom de la personne A contacter en cas d'urgence`
//       //   }
//       // }
//     },

//     eat_alone: {
//       type: DataTypes.STRING(10),
//       allowNull: false,
//       validate: {
//         isIn: {
//           args: [["oui", "non"]],
//           msg: "la valeur des infos sur le repas doit-etre fournie A oui ou non",
//         },
//         notNull: {
//           msg: `Votre enfant mange-t-il seul?`,
//         },
//       },
//     },

//   },


//     { paranoid: true },
//     {
//       timestamps: true,
//       createdAt: "created",
//       updatedAt: true,
//     }
//   );

//   return Child;
// }; //
// // Cocktail.sync()
// //  Cocktail.sync({force: true})
// //  Cocktail.sync({alter: true})
// //module.exports = Cocktail;
