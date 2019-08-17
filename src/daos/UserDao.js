import DB from '../database/DatabaseWrapper';
import * as QueryConstants from '../constants/QueryConstants';
class UserDao {

  async findByEmail(email) {
    const [rows] = await DB.query(QueryConstants.FIND_BY_EMAIL, [email])
      .catch(err => {
        return Promise.reject(err.message);
      });
    return rows;
  }

  async signup(userModel) {
    const [rows] = await DB.query(QueryConstants.INSERT_USER,
      [userModel.firstName, userModel.lastName, userModel.email, userModel.phoneNumber, userModel.gender, userModel.password])
      .catch(err => {
        return Promise.reject(err.message);
      });
    return rows.insertId;
  }
}
export default UserDao;