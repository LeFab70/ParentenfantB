class MainErrors extends Error {
  constructor(errorMessage, errorType = "") {
    super();
    this.name = this.constructor.name;
    this.message = errorMessage;
    switch (this.constructor.name) {
      case "AuthentificationError":
        console.log("authen");
        break;
      case "UsersError":
        console.log("user");
        break;
      case "CocktailError":
        //console.log(errorType);
        errorType == 1
          ? (this.statusCode = 409) //existe deja
          : (this.statusCode = 404); //resource non trouvee
        break;
      case "ParametersError":
        //console.log("parameter");
        this.statusCode = 400;
        break;
      default:
        //console.log("others");
        this.statusCode = 500;
        break;
    }
  }
}

class AuthentificationError extends MainErrors {}
class UsersError extends MainErrors {}
class CocktailError extends MainErrors {}
class ParametersError extends MainErrors {}

module.exports = {
  AuthentificationError,
  UsersError,
  ParametersError,
  MainErrors,
  CocktailError,
};
