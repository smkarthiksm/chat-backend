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
    const [rows] = await DB.query(QueryConstants.INSERT_CHAT, [createdById, currentDate])
      .catch(err => {
        throw err;
      });
    return rows.insertId;
  }

  async insertIntoChatMembers(members) {
    const [rows] = await DB.query(QueryConstants.INSERT_CHAT_MEMBERS, [members])
      .catch(err => {
        console.log(err);
        throw err;
      });
    return rows;
  }

  async getChatsAssociatedWithUser(id) {
    const [rows] = await DB.query(QueryConstants.FIND_CHATS_ASSOCIATED_USER, [id, id])
      .catch(err => {
        throw err;
      });
    return rows;
  }

  async getChatForUser(id, chatId) {
    const [rows] = await DB.query(QueryConstants.FIND_CHAT_FOR_USER, [id, chatId])
      .catch(err => {
        throw err;
      });
    return rows;
  }

  async getChatMessages(chatId) {
    const [rows] = await DB.query(QueryConstants.FIND_CHAT_MESSAGES, [chatId])
      .catch(err => {
        throw err;
      });
    return rows;
  }

  async getChatMembers(id, chatId) {
    const [rows] = await DB.query(QueryConstants.FIND_CHAT_MEMBERS, [chatId, id])
      .catch(err => {
        throw err;
      });
    return rows;
  }
  async insertNewMessage(userId, chatBody, currentDate) {
    const [rows] = await DB.query(QueryConstants.INSERT_NEW_MESSAGE, [chatBody.chatId, userId, chatBody.message, currentDate, 1])
      .catch(err => {
        throw err;
      });
    return rows;
  }
}
export default ChatsDao;