import * as ApplicationConstants from '../constants/ApplicationConstants';
import ExceptionHandler from '../exceptions/ExceptionHandler';
import UserManagementDao from '../daos/UserManagementDao';
import UserModel from '../models/UserModel';
import * as JWTUtility from '../utilities/JWTUtility';
import * as Utility from '../utilities/utility';
class UserManagementDelegate {

  async signup(body) {
    try {
      const isNewUser = await new UserManagementDelegate().isEmailExist(body.email);
      if (isNewUser) {
        const hashPassword = await Utility.generatePasswordHash(body.password);
        const userModel = new UserModel(body.id, body.firstName, body.lastName, body.email, body.phoneNumber);
        const response = await new UserManagementDao().signup(userModel);
        userModel.id = response;
        userModel.password = hashPassword;
        await new UserManagementDao().insertPassword(userModel);
        delete userModel.password;
        return userModel;
      }
      else {
        throw ApplicationConstants.EMAIL_EXISTS;
      }
    }
    catch (err) {
      throw new ExceptionHandler(err);
    }
  }

  async isEmailExist(email) {
    const response = await new UserManagementDao().findByEmail(email);
    if (response.length == 0) {
      return true;
    }
    else {
      return false;
    }
  }

  async login(body) {
    try {
      const userModel = new UserModel();
      userModel.email = body.email;
      const response = await new UserManagementDao().login(userModel);
      if (response.length > 0) {
        if (await Utility.comparePasswordHash(body.password, response[0].password)) {
          return JWTUtility.generateJWT({ "email": userModel.email });
        }
        else {
          throw ({ message: ApplicationConstants.ACCOUNT_NOT_PRESENT, status: ApplicationConstants.NOT_FOUND });
        }
      }
      else {
        throw ({ message: ApplicationConstants.ACCOUNT_NOT_PRESENT, status: ApplicationConstants.NOT_FOUND });
      }
    }
    catch (err) {
      throw new ExceptionHandler(err.message, err.status);
    }
  }

}

export default UserManagementDelegate;