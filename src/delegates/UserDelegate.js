import * as ApplicationConstants from '../constants/ApplicationConstants';
import ExceptionHandler from '../exceptions/ExceptionHandler';
import UserDao from '../daos/UserDao';
import UserModel from '../models/UserModel';
class UserDelegate {

  async signup(body) {
    try {
      const userModel = new UserModel(body.id, body.firstName, body.lastName, body.email, body.phoneNumber, body.gender, body.password);
      const isNewUser = await new UserDelegate().isEmailExist(body.email);
      if (isNewUser) {
        const response = await new UserDao().signup(userModel);
        userModel.id = response;
        return userModel;
      }
      else {
        throw new ExceptionHandler(ApplicationConstants.EMAIL_EXISTS);
      }
    }
    catch (err) {
      throw new ExceptionHandler(err, ApplicationConstants.INTERNAL_SERVER_ERROR);
    }
  }

  async isEmailExist(email) {
    try {
      const records = await new UserDao().findByEmail(email);
      if (records.length == 0) {
        return true;
      }
      else {
        return false;
      }
    }
    catch (err) {
      throw new ExceptionHandler(err, ApplicationConstants.INTERNAL_SERVER_ERROR);
    }
  }
}

export default UserDelegate;