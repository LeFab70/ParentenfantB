const { Sequelize } = require("sequelize");
//const User = require("./models/users.models");

const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

//const db.User = require("./models/users.models");
//console.log(DB_HOST,);
// connexion à la base de données mysql
const sequelize = new Sequelize(
  //DB_HOST,
  DB_NAME,

  DB_USER,
  DB_PASSWORD,
  {
    host: DB_HOST,
    dialect: "mysql",
    port: DB_PORT,
    logging: false, // (...msg) => console.log(msg),
  }
);

const common = (options) => ({
  ...options,
  onDelete: "CASCADE",
  OnUpdate: "CASCADE",
});

// mise en relation des tables au point centrale pour simplifier le traitement
const db = {};
db.sequelize = sequelize;
db.Member = require("./models/member.models")(sequelize);
db.Period = require("./models/period.models")(sequelize);
db.HasMember = require("./models/has_member.models")(sequelize);
//db.Parent = require("./models/parent.models")(sequelize);
//db.Child = require("./models/child.models")(sequelize);
//db.HasChild = require("./models/has_child.models")(sequelize);
db.PersonTakeChild = require("./models/person_take_child.models")(sequelize);
//db.IntervenantChild = require("./models/intervenant.models")(sequelize);
//db.HasFollowChild = require("./models/has_follow_child.models")(sequelize);
db.User = require("./models/users.models")(sequelize);
db.Roles = require("./models/role.models")(sequelize);
db.Volet = require("./models/volet.models")(sequelize);
db.Permission = require("./models/permission.models")(sequelize);
db.RolePermission = require("./models/role_permission.models")(sequelize);
/********************************
 *
 *
 * Mise en relation des tables entre-elles
 *
 *
 */

///------------------------------------------///////

// relation membres-----period---hasmembre---volet   =====Relation M---M //////////
db.Member.belongsToMany(
  db.Period,
  //db.Volet,
  common({
    through: "Has_member",
    foreignKey: "Id_member",
    otherKey: "Id_period",
    uniqueKey: "Id_Has_member",
    //otherKey: "Id_volet",
  })
);

db.Member.belongsToMany(
  // db.Period,
  db.Volet,
  common({
    through: "Has_member",
    foreignKey: "Id_member",
    //otherKey: "Id_period",
    otherKey: "Id_volet",
    uniqueKey: "Id_Has_member",
  })
);

db.Period.belongsToMany(
  db.Member,
  //db.Volet,
  common({
    through: "Has_member",
    foreignKey: "Id_period",
    otherKey: "Id_member",
    // otherKey: "Id_volet",
    uniqueKey: "Id_Has_member",
  })
);

db.Period.belongsToMany(
  //db.Member,
  db.Volet,
  common({
    through: "Has_member",
    foreignKey: "Id_period",
    //otherKey: "Id_member",
    otherKey: "Id_volet",
    uniqueKey: "Id_Has_member",
  })
);

db.Volet.belongsToMany(
  db.Member,
  //db.Period,
  common({
    through: "Has_member",
    foreignKey: "Id_volet",
    otherKey: "Id_member",
    //otherKey: "Id_period",
    uniqueKey: "Id_Has_member",
  })
);
db.Volet.belongsToMany(
  //db.Member,
  db.Period,
  common({
    through: "Has_member",
    foreignKey: "Id_volet",
    //otherKey: "Id_member",
    otherKey: "Id_period",
    uniqueKey: "Id_Has_member",
  })
);
db.HasMember.belongsTo(db.Member, { foreignKey: "Id_member" });
db.HasMember.belongsTo(db.Period, { foreignKey: "Id_period" });
db.HasMember.belongsTo(db.Volet, { foreignKey: "Id_volet" });

db.Member.hasMany(db.HasMember, { foreignKey: "Id_member" });
db.Period.hasMany(db.HasMember, { foreignKey: "Id_period" });
db.Volet.hasMany(db.HasMember, { foreignKey: "Id_volet" });
///------------------------------------------///////
// relation membres-----parent-=====Relation Multi---One //////////
// db.Member.hasMany(
//   db.Parent,
//   common({
//     foreignKey: "Id_member", //ici on force la creation manuelle de la cle etrangere
//   })
// );

// db.Parent.belongsTo(db.Member, {
//   foreignKey: "Id_member",
// });

///------------------------------------------///////
// relation parent-----enfants---haschild=====Relation M---M //////////
// db.Parent.belongsToMany(
//   db.Child,
//   common({
//     through: "Has_child",
//     foreignKey: "Id_parent",
//     otherKey: "Id_child",
//   })
// );

// db.Child.belongsToMany(
//   db.Parent,
//   common({
//     through: "Has_child",
//     foreignKey: "Id_child",
//     otherKey: "Id_parent",
//   })
// );

// db.HasChild.belongsTo(db.Parent, { foreignKey: "Id_parent" });
// db.HasChild.belongsTo(db.Child, { foreignKey: "Id_child" });
// db.Parent.hasMany(db.HasChild, { foreignKey: "Id_parent" });
// db.Child.hasMany(db.HasChild, { foreignKey: "Id_child" });

///------------------------------------------///////
// relation Member-----person to take-=====Relation Multi---One //////////
db.Member.hasMany(
  db.PersonTakeChild,
  common({
    foreignKey: "Id_member", //ici on force la creation manuelle de la cle etrangere
  })
);

db.PersonTakeChild.belongsTo(db.Member, {
  foreignKey: "Id_member",
});

///------------------------------------------///////
// relation intervenant-----enfants---has_follow_child=====Relation M---M //////////
// db.Child.belongsToMany(
//   db.IntervenantChild,
//   common({
//     through: "Has_follow_child",
//     foreignKey: "Id_child",
//     otherKey: "Id_intervenant",
//   })
// );

// db.IntervenantChild.belongsToMany(
//   db.Child,
//   common({
//     through: "Has_follow_child",
//     foreignKey: "Id_intervenant",
//     otherKey: "Id_child",
//   })
// );

// db.HasFollowChild.belongsTo(db.IntervenantChild, {
//   foreignKey: "Id_intervenant",
// });
// db.HasFollowChild.belongsTo(db.Child, { foreignKey: "Id_child" });
// db.IntervenantChild.hasMany(db.HasFollowChild, {
//   foreignKey: "Id_intervenant",
// });
// db.Child.hasMany(db.HasFollowChild, { foreignKey: "Id_child" });

///------------------------------------------///////
// relation utilisateur-----role-=====Relation Multi---One //////////
db.Roles.hasMany(
  db.User,
  common({
    foreignKey: "Id_role", //ici on force la creation manuelle de la cle etrangere
  })
);

db.User.belongsTo(db.Roles, {
  foreignKey: "Id_role",
});

///------------------------------------------///////
// relation role-----permission---role_permission=====Relation M---M //////////
db.Roles.belongsToMany(
  db.Permission,
  common({
    through: "Role_permission",
    foreignKey: "Id_role",
    otherKey: "Id_permission",
  })
);

db.Permission.belongsToMany(
  db.Roles,
  common({
    through: "Role_permission",
    foreignKey: "Id_permission",
    otherKey: "Id_role",
  })
);

db.RolePermission.belongsTo(db.Roles, {
  foreignKey: "Id_role",
});
db.RolePermission.belongsTo(db.Permission, { foreignKey: "Id_permission" });
db.Roles.hasMany(db.RolePermission, {
  foreignKey: "Id_role",
});
db.Permission.hasMany(db.RolePermission, { foreignKey: "Id_period" });

//synchronisation de modeles
db.sequelize.sync();
// db.sequelize.sync((err) => {
//   console.log("database non synchonisee", err);
// });
// synchronisation generale,
// on aurait aussi pu le faire dans chaque modele correspondant
module.exports = db;
