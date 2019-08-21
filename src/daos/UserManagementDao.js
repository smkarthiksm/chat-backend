import DB from '../database/DatabaseWrapper';
import * as QueryConstants from '../constants/QueryConstants';
class UserManagementDao {

  async findByEmail(email) {
    const [rows] = await DB.query(QueryConstants.FIND_BY_EMAIL, [email])
      .catch(err => {
        throw err;
      });
    return rows;
  }

  async signup(userModel) {
    const [rows] = await DB.query(QueryConstants.INSERT_USER,
      [userModel.firstName, userModel.lastName, userModel.email, userModel.phoneNumber])
      .catch(err => {
        throw err;
      });
    return rows.insertId;
  }

  async insertPassword(userModel) {
    const [rows] = await DB.query(QueryConstants.INSERT_PASSWORD,
      [userModel.id, userModel.password])
      .catch(err => {
        throw err;
      });
    return rows.insertId;
  }

  async login(userModel) {    
    const [rows] = await DB.query(QueryConstants.FIND_BY_EMAIL_AND_PASSWORD,
      [userModel.email])
      .catch(err => {
        throw err;
      });
    return rows;
  }

}
export default UserManagementDao;