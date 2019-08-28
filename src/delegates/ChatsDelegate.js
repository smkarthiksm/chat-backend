import * as ApplicationConstants from '../constants/ApplicationConstants';
import ChatsDao from '../daos/ChatsDao';
import ExceptionHandler from '../exceptions/ExceptionHandler';
import moment from 'moment';
class ChatsDelegate {
  async createNewDirectMessage(chatsModel) {
    try {
      let response = await new ChatsDao().getChatsForUser(chatsModel.ids);
      if (response.length == 0) {
        const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
        const chatCreationId = await new ChatsDao().insertIntoChatCreation(chatsModel.createdBy, currentDate);
        if (chatCreationId) {
          const chatMembersMappingModelArray = new ChatsDelegate().generateArrayForInsert(chatCreationId, chatsModel);
          response = await new ChatsDao().insertIntoChatMembersMapping(chatMembersMappingModelArray);
        }
      }
      else {
        throw ApplicationConstants.DIRECT_MESSAGE_ALREADY_EXISTS;
      }
      return response;
    }
    catch (err) {
      throw new ExceptionHandler(err);
    }
  }

  generateArrayForInsert(chatCreationId, chatsModel) {
    const chatMembersMappingModelArray = [];
    chatsModel.ids.forEach(element => {
      chatMembersMappingModelArray.push([chatCreationId, element]);
    });
    return chatMembersMappingModelArray;
  }
}

export default ChatsDelegate;