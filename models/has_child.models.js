// const { DataTypes } = require("sequelize");
// //const sequelize = require("../db.config");
// //const DB = require("../db.config");

// module.exports = (sequelize) => {
//   const Has_child = sequelize.define(
//     "Has_child",
//     {
//       Id_parent: {
//         type: DataTypes.INTEGER(255),
//         primaryKey: true,
//       },
//       Id_child: {
//         type: DataTypes.INTEGER(255),
//         primaryKey: true,
//       },
//     },

//     { paranoid: true },
//     {
//       timestamps: true,
//       createdAt: "created",
//       updatedAt: true,
//     }
//   );

//   return Has_child;
// }; //
// // Cocktail.sync()
// //  Cocktail.sync({force: true})
// //  Cocktail.sync({alter: true})
// //module.exports = Cocktail;
