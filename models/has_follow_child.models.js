// const { DataTypes } = require("sequelize");
// //const sequelize = require("../db.config");
// //const DB = require("../db.config");

// module.exports = (sequelize) => {
//   const Has_follow_child = sequelize.define(
//     "Has_follow_child",
//     {
//       Id_intervenant: {
//         type: DataTypes.INTEGER(255),
//         primaryKey: true,
//       },

//       Id_child: {
//         type: DataTypes.INTEGER(255),
//         primaryKey: true,
//       },

//       follow_date: {
//         ///ici on peut avoir un autre intervanant aucours de la meme annee de l'activite
//         type: DataTypes.DATE,
//         allowNull: false,
//         isDate: true,

//         validate: {
//           notNull: {
//             msg: `fournir la date de periode de suivie`,
//           },
//           customValidator(value) {
//             if (new Date(value) < new Date()) {
//               throw new Error("invalid date");
//             }
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

//   return Has_follow_child;
// }; //
// // Cocktail.sync()
// //  Cocktail.sync({force: true})
// //  Cocktail.sync({alter: true})
// //module.exports = Cocktail;
