import * as ApplicationConstants from '../constants/ApplicationConstants';
import ExceptionHandler from '../exceptions/ExceptionHandler';
import UserDao from '../daos/UserDao';
import UserModel from '../models/UserModel';
import * as Utility from '../utilities/utility';
class UserDelegate {

  async signup(body) {
    try {
      const isNewUser = await new UserDelegate().isEmailExist(body.email);
      if (isNewUser) {
        const hashPassword = await Utility.generatePasswordHash(body.password);
        const userModel = new UserModel(body.id, body.firstName, body.lastName, body.email, body.phoneNumber);
        const response = await new UserDao().signup(userModel);
        userModel.id = response;
        userModel.password = hashPassword;
        await new UserDao().insertPassword(userModel);
        delete userModel.password;
        return userModel;
      }
      else {
        throw ApplicationConstants.EMAIL_EXISTS;
      }
    }
    catch (err) {
      console.log(err);

      throw new ExceptionHandler(err);
    }
  }

  async isEmailExist(email) {
    const response = await new UserDao().findByEmail(email);
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
      userModel.password = await Utility.generatePasswordHash(body.password);
      console.log(userModel.password);

      const response = await new UserDao().login(userModel);
      if (response.length == 0) {
        throw ({ message: ApplicationConstants.ACCOUNT_NOT_PRESENT, statusCode: ApplicationConstants.NOT_FOUND });
      }
      else {
        return response[0];
      }

    }
    catch (err) {
      throw new ExceptionHandler(err.message, err.statusCode);
    }
  }

}

export default UserDelegate;