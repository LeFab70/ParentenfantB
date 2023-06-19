const { DataTypes } = require("sequelize");
//const sequelize = require("../db.config");
//const DB = require("../db.config");

module.exports = (sequelize) => {
  const Member = sequelize.define(
    "Member",
    {
      Id_member: {
        type: DataTypes.STRING(100),
        primaryKey: true,
        //allowNull: trur,
        //autoIncrement: true,
      },
      card_member: {
        type: DataTypes.INTEGER(100),
        allowNull: false,
        //unique: true,
      },

      id_parent: {
        type: DataTypes.STRING(100),
        allowNull: true,
        //unique: true,
      },
      id_intervenant: {
        type: DataTypes.STRING(100),
        allowNull: true,
        //unique: true,
      },
      id_conjoint: {
        type: DataTypes.STRING(100),
        allowNull: true,
        //unique: true,
      },
      adress_member: {
        type: DataTypes.STRING(200),
        //allowNull: false,
        // validate: {
        //   notNull: {
        //     msg: `fournir l'adresse de la personne `,
        //   },
        //   notEmpty: {
        //     msg: `fournir l'adresse' de la personne`,
        //   },
        // },
      },

      city_member: {
        type: DataTypes.STRING(200),
        // allowNull: false,
        // validate: {
        //   notNull: {
        //     msg: `fournir la ville de la personne `,
        //   },
        //   notEmpty: {
        //     msg: `fournir la ville de la personne`,
        //   },
        // },
      },

      province_member: {
        type: DataTypes.STRING(200),
        // allowNull: false,
        // validate: {
        //   notNull: {
        //     msg: `fournir la province de la personne `,
        //   },
        //   notEmpty: {
        //     msg: `fournir la province de la personne`,
        //   },
        // },
      },

      codePostal_member: {
        type: DataTypes.STRING(200),
        // allowNull: false,
        // validate: {
        //   notNull: {
        //     msg: `fournir le codePostal de la personne `,
        //   },
        //   notEmpty: {
        //     msg: `fournir le codePostal de la personne`,
        //   },
        // },
      },
      email_member: {
        type: DataTypes.STRING(200),
        // allowNull: false,
        validate: {
          isEmail: "la valeur fournir doit-etre une adresse mail",
          // notNull: {
          //   msg: `fournir l'email de la personne A contacter en cas d'urgence`,
          // },
          // notEmpty: {
          //   msg: `fournir l'email de la personne`,
          // },
        },
      },
      phone_member: {
        type: DataTypes.STRING(200),
        // allowNull: false,
        // validate: {
        //   notNull: {
        //     msg: `fournir le numero de la personne`,
        //   },
        //   notEmpty: {
        //     msg: `fournir l'email de la personne`,
        //   },
        // },
      },

      type_of_family: {
        type: DataTypes.STRING(200),
        // allowNull: if(id_parent!==null) true,
        // validate: {
        //   isNull {
        //     if (this.id_parent !== null)
        //       throw new Error("type de famille requis");
        //   },
        // },

        //allowNull: true,
        defaultValue: "Nucléaire",
        // validate: {
        //   typeOfFamily() {
        //     if (this.id_parent !== null)
        //       throw new Error("type de famille requis");
        //   },
        // },
      },
      family_income: {
        type: DataTypes.STRING(100),
        allowNull: true,
        // validate: {
        //   //notEmpty: { msg: "Revenu familial Données non fournies !!" },
        //   isInt: { msg: "la valeur doit-etre un entier naturel" },
        // },
      },
      number_children_house: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        default: 0,
        validate: {
          //notEmpty: { msg: "nombre d'enfants maison Données non fournies !!" },
          isInt: { msg: "la valeur doit-etre un entier naturel" },
        },
      },
      number_children_carrefour: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        default: 0,
        validate: {
          // notEmpty: {
          //   msg: "nombre d'enfants carrefour Données non fournies !!",
          // },
          isInt: { msg: "la valeur doit-etre un entier naturel" },
        },
      },
      number_adult: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        default: 0,
        validate: {
          //notEmpty: { msg: "nombre d'aldutes Données non fournies !!" },
          isInt: { msg: "la valeur doit-etre un entier naturel" },
        },
      },
      how_know_us: {
        type: DataTypes.STRING(200),
        allowNull: true,
        defaultValue: "famille",
      },
      status_member: {
        type: DataTypes.STRING(10),
        //allowNull: false,
        defaultValue: "actif",
        validate: {
          isIn: {
            args: [["actif", "inactif"]],
            msg: "la valeur du statut doit-etre actif or inactif",
          },
        },
      },

      fname_urgency: {
        type: DataTypes.STRING(200),
        // allowNull: false,
        // validate: {
        //   notNull: {
        //     msg: `fournir le nom de la personne A contacter en cas d'urgence`,
        //   },
        // },
      },

      email_urgency: {
        type: DataTypes.STRING(200),
        // allowNull: false,
        // validate: {
        //   isEmail: "la valeur fournir doit-etre une adresse mail",
        //   notNull: {
        //     msg: `fournir l'email de la personne A contacter en cas d'urgence`,
        //   },
        // },
      },
      phone_urgency: {
        type: DataTypes.STRING(200),
        allowNull: true,
        // validate: {
        //   notNull: {
        //     msg: `fournir le numero de la personne A contacter en cas d'urgence`,
        //   },
        // },
      },

      lien_urgency: {
        type: DataTypes.STRING(200),
        allowNull: true,
        // validate: {
        //   notNull: {
        //     msg: `Quel est le lien avec la personne A contacter en cas d'urgence`,
        //   },
        // },
      },
      adresse_urgency: {
        type: DataTypes.STRING(200),
        allowNull: true,
        // validate: {
        //   notNull: {
        //     msg: `Quel est le lien avec la personne A contacter en cas d'urgence`,
        //   },
        // },
      },
      remarks: {
        type: DataTypes.STRING(200),
        allowNull: true,

        // validate: {
        //   notNull: {
        //     msg: `fournir le nom de la personne A contacter en cas d'urgence`
        //   }
        // }
      },
      fonction: {
        type: DataTypes.STRING(200),
        allowNull: true,
        // validate: {
        //   notNull: {
        //     msg: `Quel est le lien avec la personne A contacter en cas d'urgence`,
        //   },
        // },
      },
      paid_card: {
        type: DataTypes.STRING(10),
        //allowNull: false,
        defaultValue: "non",
        validate: {
          isIn: {
            args: [["oui", "non"]],
            msg: "la valeur des infos sur le payement de la carte doit-etre fournie A oui ou non",
          },
          // notNull: {
          //   msg: `Carte paye ou non?`,
          // },
        },
      },

      fname: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          notNull: {
            msg: `fournir le nom de la personne`,
          },
          notEmpty: {
            msg: `fournir le nom de la personne`,
          },
        },
      },
      lname: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          notNull: {
            msg: `fournir le nom de la personne `,
          },
          notEmpty: {
            msg: `fournir le prenom de la personne`,
          },
        },
      },

      level_of_school: {
        type: DataTypes.STRING(200),
        // allowNull: false,
        // validate: {
        //   // notNull: {
        //   //   msg: `fournir le niveau scolaire de la personne `,
        //   // },
        //   notEmpty: {
        //     msg: `fournir le niveau scolaire  de la personne`,
        //   },
        // },
      },
      group_of_age: {
        type: DataTypes.STRING(200),
        // allowNull: false,
        // validate: {
        //   // notNull: {
        //   //   msg: `fournir le niveau scolaire de la personne `,
        //   // },
        //   notEmpty: {
        //     msg: `fournir le niveau scolaire  de la personne`,
        //   },
        // },
      },
      school_child: {
        type: DataTypes.STRING(200),
        // allowNull: false,
        // validate: {
        //   // notNull: {
        //   //   msg: `fournir le niveau scolaire de la personne `,
        //   // },
        //   notEmpty: {
        //     msg: `fournir le niveau scolaire  de la personne`,
        //   },
        // },
      },
      birthday_child: {
        type: DataTypes.DATE,
        allowNull: true,
        isDate: true,
        validate: {
          //   notNull: {
          //     msg: `fournir la date de naissance`,
          //   },
          customValidator(value) {
            if (new Date(value) > new Date()) {
              throw new Error("invalid date");
            }
          },
        },
      },

      numberHealth: {
        type: DataTypes.STRING(200),
        ///allowNull: false,
        // validate: {
        //   notNull: {
        //     msg: `fournir la carte sante`,
        //   },
        //   notEmpty: {
        //     msg: `fournir la carte sante`,
        //   },
        // },
      },

      expirationHealth: {
        type: DataTypes.DATE,
        //allowNull: false,
        isDate: true,
        // validate: {
        //   notNull: {
        //     msg: `fournir la date de expiration de la carte sante`,
        //   },
        //   customValidator(value) {
        //     if (new Date(value) > new Date()) {
        //       throw new Error("invalid date");
        //     }
        //   },
        // },
      },

      sexe: {
        type: DataTypes.STRING(20),
        allowNull: false,
        // defaultValue: "M",
        // validate: {
        //   isIn: {
        //     args: ["F", "M"],
        //     msg: "le sexe doit-etre M ou F",
        //   },
        // },
      },

      rentreSeul: {
        type: DataTypes.STRING(20),
        // allowNull: false,
        defaultValue: "non",
        // validate: {
        //   isIn: {
        //     args: ["non", "oui"],

        //     msg: "Precisez si oui ou non il doit rentrer seul",
        //   },
        // },
      },

      autorisationPicture: {
        type: DataTypes.STRING(20),
        // allowNull: false,
        // defaultValue: "non",
        // validate: {
        //   isIn: {
        //     args: ["non", "oui"],

        //     msg: "autorisation de Photo oui ou non?",
        //   },
        // },
      },

      autorisationDivulguerInfo: {
        type: DataTypes.STRING(20),
        // allowNull: false,
        // defaultValue: "non",
        // validate: {
        //   isIn: {
        //     args: ["non", "oui"],

        //     msg: "autorisation de Divulguer Info oui ou non?",
        //   },
        // },
      },

      autorisationDivulgationDoctor: {
        type: DataTypes.STRING(20),
        // allowNull: false,
        // defaultValue: "non",
        // validate: {
        //   isIn: {
        //     args: ["non", "oui"],

        //     msg: "autorisation Divulgation au Docteur oui ou non?",
        //   },
        // },
      },

      health_info: {
        type: DataTypes.STRING(10),
        //allowNull: false,
        // validate: {
        //   isIn: {
        //     args: [["oui", "non"]],
        //     msg: "la valeur des infos sur la sante doit-etre fournie",
        //   },
        //   notNull: {
        //     msg: `renseignez sur la sante`,
        //   },
        // },
      },

      details_health: {
        type: DataTypes.STRING(200),
        allowNull: true,
        // validate: {
        //   notNull: {
        //     msg: `fournir le nom de la personne A contacter en cas d'urgence`
        //   }
        // }
      },

      allergies_connues: {
        type: DataTypes.STRING(200),
        allowNull: true,
        // validate: {
        //   notNull: {
        //     msg: `fournir le nom de la personne A contacter en cas d'urgence`
        //   }
        // }
      },
      restrictions_foods: {
        type: DataTypes.STRING(200),
        allowNull: true,
        // validate: {
        //   notNull: {
        //     msg: `fournir le nom de la personne A contacter en cas d'urgence`
        //   }
        // }
      },
      medicaments: {
        type: DataTypes.STRING(200),
        allowNull: true,
        // validate: {
        //   notNull: {
        //     msg: `fournir le nom de la personne A contacter en cas d'urgence`
        //   }
        // }
      },

      eat_alone: {
        type: DataTypes.STRING(10),
        //allowNull: false,
        validate: {
          isIn: {
            args: [["oui", "non"]],
            msg: "la valeur des infos sur le repas doit-etre fournie A oui ou non",
          },
          // notNull: {
          //   msg: `Votre enfant mange-t-il seul?`,
          // },
        },
      },
      sourceRevenue: {
        type: DataTypes.STRING(200),
        // allowNull: false,
        // validate: {
        //   notNull: {
        //     msg: `fournir la source de revenu`,
        //   },
        //   notEmpty: {
        //     msg: `fournir l'email de la personne`,
        //   },
        // },
      },

      language: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          notNull: {
            msg: `fournir la langue parlee`,
          },
          notEmpty: {
            msg: `fournir la langue parlee`,
          },
        },
      },

      origineEthnique: {
        type: DataTypes.STRING(200),
        // allowNull: false,
        // validate: {
        //   notNull: {
        //     msg: `fournir l'ethnique'`,
        //   },
        //   notEmpty: {
        //     msg: `fournir l'ethnique'`,
        //   },
        // },
      },
      // autorisationDivulgationSchool: {
      //   type: DataTypes.STRING(20),
      //   allowNull: false,
      //   defaultValue: "non",
      //   validate: {
      //     isIn: {
      //       args: ["non", "oui"],

      //       msg: "autorisationDivulgationSchool oui ou non?",
      //     },
      //   },
      // },
      // },
      parent_tuteur: {
        ///il ne peut y avoir qu'un seul tuteur
        type: DataTypes.STRING(10),
        //allowNull: false,
        defaultValue: "non",
        validate: {
          isIn: {
            args: [["oui", "non"]],
            msg: "la valeur du tuteur doit-etre oui ou non",
          },
        },
      },

      type_of_member: {
        ///il ne peut y avoir qu'un seul tuteur
        type: DataTypes.STRING(10),
        allowNull: false,
        // defaultValue: "FAMILLE",
        // validate: {
        //   isIn: {
        //     args: [
        //       ["FAMILLE", "BENEVOLE", "PARTENAIRE", "STAGIAIRE", "EMPLOYE"],
        //     ],
        //     msg: "la valeur ne correspond pas a aucun type de membre",
        //   },
        // },
      },
      // {
      //   sequelize,
      //   validate: {
      //     typeOfFamily() {
      //       if (this.id_parent !== null)
      //         throw new Error("type de famille requis");
      //     },
      //   },
    },

    { paranoid: true },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: true,
    }
  );

  return Member;
}; //
// Cocktail.sync()
//  Cocktail.sync({force: true})
//  Cocktail.sync({alter: true})
//module.exports = Cocktail;

/**************************  remarks **************
 * 1. creer le code membre qui doit venir de uuid donc plus autoincrement car il sera utilise pour
 *  mettre le idParent
 *  la carte de membre ne doit plus etre unique
 *
 * 2. annuler les tables enfants et parents car ils sont tous des membres
 * 3. relier lintervenant au membre
 * 4. metttre le idParent dans la table membre et selon cela faire des conditions
 *    sur les autres champs a remplir dans cette table si la valeur est null alors
 *    certains champs ne seront obligatoires
 * 5. completer les details sur le membres depuis les donnees des tables enfants et parents
 *
 *
 *
 *
 *
 *
 *
 */
