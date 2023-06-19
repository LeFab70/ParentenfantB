// const { DataTypes } = require("sequelize");
// //const sequelize = require("../db.config");
// //const DB = require("../db.config");

// module.exports = (sequelize) => {
//   const Parent = sequelize.define(
//     "Parent",
//     {
//       Id_parent: {
//         type: DataTypes.INTEGER(255),
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       Id_member: {
//         type: DataTypes.STRING(255),
//         allowNull: false,
//         unique: true,
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

//       adress: {
//         type: DataTypes.STRING(200),
//         allowNull: false,
//         validate: {
//           notNull: {
//             msg: `fournir l'adresse de la personne `,
//           },
//           notEmpty: {
//             msg: `fournir l'adresse' de la personne`,
//           },
//         },
//       },

//       city: {
//         type: DataTypes.STRING(200),
//         allowNull: false,
//         validate: {
//           notNull: {
//             msg: `fournir la ville de la personne `,
//           },
//           notEmpty: {
//             msg: `fournir la ville de la personne`,
//           },
//         },
//       },

//       province: {
//         type: DataTypes.STRING(200),
//         allowNull: false,
//         validate: {
//           notNull: {
//             msg: `fournir la province de la personne `,
//           },
//           notEmpty: {
//             msg: `fournir la province de la personne`,
//           },
//         },
//       },

//       codePostal: {
//         type: DataTypes.STRING(200),
//         allowNull: false,
//         validate: {
//           notNull: {
//             msg: `fournir le codePostal de la personne `,
//           },
//           notEmpty: {
//             msg: `fournir le codePostal de la personne`,
//           },
//         },
//       },
//       email: {
//         type: DataTypes.STRING(200),
//         allowNull: false,
//         validate: {
//           isEmail: "la valeur fournir doit-etre une adresse mail",
//           notNull: {
//             msg: `fournir l'email de la personne A contacter en cas d'urgence`,
//           },
//           notEmpty: {
//             msg: `fournir l'email de la personne`,
//           },
//         },
//       },
//       phone: {
//         type: DataTypes.STRING(200),
//         allowNull: false,
//         validate: {
//           notNull: {
//             msg: `fournir le numero de la personne`,
//           },
//           notEmpty: {
//             msg: `fournir l'email de la personne`,
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

//       sourceRevenue: {
//         type: DataTypes.STRING(200),
//         allowNull: false,
//         validate: {
//           notNull: {
//             msg: `fournir la source de revenu`,
//           },
//           notEmpty: {
//             msg: `fournir l'email de la personne`,
//           },
//         },
//       },

//       language: {
//         type: DataTypes.STRING(200),
//         allowNull: false,
//         validate: {
//           notNull: {
//             msg: `fournir la langue parlee`,
//           },
//           notEmpty: {
//             msg: `fournir la langue parlee`,
//           },
//         },
//       },

//       origineEthnique: {
//         type: DataTypes.STRING(200),
//         allowNull: false,
//         validate: {
//           notNull: {
//             msg: `fournir l'ethnique'`,
//           },
//           notEmpty: {
//             msg: `fournir l'ethnique'`,
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

//       tuteur: {
//         ///il ne peut y avoir qu'un seul tuteur
//         type: DataTypes.STRING(10),
//         allowNull: false,
//         validate: {
//           isIn: {
//             args: [["oui", "non"]],
//             msg: "la valeur du tuteur doit-etre oui ou non",
//           },
//         },
//       },
//     },

//     { paranoid: true },
//     {
//       timestamps: true,
//       createdAt: "created",
//       updatedAt: true,
//     }
//   );

//   return Parent;
// }; //
// // Cocktail.sync()
// //  Cocktail.sync({force: true})
// //  Cocktail.sync({alter: true})
// //module.exports = Cocktail;
