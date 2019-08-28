import DB from '../database/DatabaseWrapper';
import * as QueryConstants from '../constants/QueryConstants';
class ChatsDao {

  async getChatsForUser(ids) {
    const [rows] = await DB.query(QueryConstants.FIND_CHATS_FOR_USER, [ids.length, [ids], ids.length])
      .catch(err => {
        throw err;
      });
    return rows;
  }
  async insertIntoChatCreation(createdById, currentDate) {
    const [rows] = await DB.query(QueryConstants.INSERT_CHAT_CREATION, [createdById, currentDate])
      .catch(err => {
        throw err;
      });
    return rows.insertId;
  }

  async insertIntoChatMembersMapping(members) {
    const [rows] = await DB.query(QueryConstants.INSERT_CHAT_MEMBERS_MAPPING, [members])
      .catch(err => {
        throw err;
      });
    return rows.insertId;
  }
}
export default ChatsDao;