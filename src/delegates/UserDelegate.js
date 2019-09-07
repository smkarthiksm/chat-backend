import ExceptionHandler from '../exceptions/ExceptionHandler';
import UserDao from '../daos/UserDao';
class UserDelegate {
  async getByName(name, id) {
    try {
      console.log(id);
      
      const response = await new UserDao().findByName(name, id);
      return response;
    }
    catch (err) {
      throw new ExceptionHandler(err);
    }
  }
}
export default UserDelegate;