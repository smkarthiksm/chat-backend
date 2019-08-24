import DB from '../database/DatabaseWrapper';
import * as QueryConstants from '../constants/QueryConstants';
class UserDao {
  /**
   * 
   * @param {*} name 
   */
  async findByName(name) {
    // When name is sent without this transformation, since name is sent as array, it adds quotes to the name which causes a sql error
    name = `%${name}%`;
    const [rows] = await DB.query(QueryConstants.FIND_BY_NAME, [name, name])
      .catch(err => {
        throw err;
      });
    return rows;
  }
}
export default UserDao;