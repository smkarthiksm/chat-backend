import DB from '../database/DatabaseWrapper';
import * as QueryConstants from '../constants/QueryConstants';
class ChatsDao {

  async getGroupsForUser(ids) {
    const [rows] = await DB.query(QueryConstants.FIND_GROUPS_FOR_USER, [ids.length, [ids], ids.length])
      .catch(err => {
        throw err;
      });
    return rows;
  }
  async insertIntoChat(createdById, currentDate) {
    const [rows] = await DB.query(QueryConstants.INSERT_CHAT_CREATION, [createdById, currentDate])
      .catch(err => {
        throw err;
      });
    return rows.insertId;
  }

  async insertIntoChatMembersMapping(members) {
    const [rows] = await DB.query(QueryConstants.INSERT_CHAT_MEMBERS_MAPPING, [members])
      .catch(err => {
        console.log(err);
        throw err;
      });
    return rows;
  }

  async getChatsAssociatedWithUser(id) {
    console.log(QueryConstants.FIND_CHATS_ASSOCIATED_USER);
    const [rows] = await DB.query(QueryConstants.FIND_CHATS_ASSOCIATED_USER, [id, id])
      .catch(err => {
        throw err;
      });
    return rows;
  }
}
export default ChatsDao;