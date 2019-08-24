import ExceptionHandler from '../exceptions/ExceptionHandler';
import UserDao from '../daos/UserDao';
class UserDelegate {
  async getByName(name) {
    try {
      const response = await new UserDao().findByName(name);
      return response;
    }
    catch (err) {
      throw new ExceptionHandler(err);
    }
  }
}
export default UserDelegate;