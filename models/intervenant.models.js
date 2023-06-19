// const { DataTypes } = require("sequelize");
// //const sequelize = require("../db.config");
// //const DB = require("../db.config");

// module.exports = (sequelize) => {
//   const Intervenant = sequelize.define(
//     "Intervenant",
//     {
//       Id_intervenant: {
//         type: DataTypes.INTEGER(255),
//         primaryKey: true,
//         autoIncrement: true,
//       },

//       fname: {
//         type: DataTypes.STRING(200),
//         allowNull: false,
//         validate: {
//           notNull: {
//             msg: `fournir le nom de la personne Intervenant`,
//           },
//           notEmpty: {
//             msg: `fournir le nom de la personne Intervenant`,
//           },
//         },
//       },
//       lname: {
//         type: DataTypes.STRING(200),
//         allowNull: false,
//         validate: {
//           notNull: {
//             msg: `fournir le nom de la personne Intervenant `,
//           },
//           notEmpty: {
//             msg: `fournir le prenom de la personne Intervenant`,
//           },
//         },
//       },

//       adress: {
//         type: DataTypes.STRING(200),
//         allowNull: false,
//         validate: {
//           notNull: {
//             msg: `fournir l'adresse de la personne  Intervenant`,
//           },
//           notEmpty: {
//             msg: `fournir l'adresse' de la personne Intervenant`,
//           },
//         },
//       },

//       email: {
//         type: DataTypes.STRING(200),
//         allowNull: false,
//         validate: {
//           isEmail:
//             "la valeur fournir doit-etre une adresse mail pour Intervenant",
//           notNull: {
//             msg: `fournir l'email de Intervenant`,
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
//             msg: `fournir le numero de Intervenant`,
//           },
//           notEmpty: {
//             msg: `fournir l'email de Intervenant`,
//           },
//         },
//       },

//       status: {
//         ///il ne peut y avoir qu'un seul tuteur
//         type: DataTypes.STRING(10),
//         allowNull: false,
//         validate: {
//           isIn: {
//             args: [["actif", "inactif"]],
//             msg: "la valeur du status de Intervenant doit-etre actif ou inactif",
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

//   return Intervenant;
// }; //
// // Cocktail.sync()
// //  Cocktail.sync({force: true})
// //  Cocktail.sync({alter: true})
// //module.exports = Cocktail;
