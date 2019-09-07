import moment from 'moment';

import ChatsDao from '../daos/ChatsDao';
import DirectMessageMembersModel from '../models/DirectMessageMembersModel';
import ExceptionHandler from '../exceptions/ExceptionHandler';
import UserModel from '../models/UserModel';
class ChatsDelegate {
  async createNewDirectMessage(chatsModel) {
    try {
      const chatsDao = new ChatsDao();
      chatsModel.ids.map((elem, index) => {
        if (elem === chatsModel.createdBy) {
          chatsModel.ids.splice(index, 1);
        }
      });
      chatsModel.ids.push(chatsModel.createdBy);
      let response = await chatsDao.getGroupsForUser(chatsModel.ids);
      let chatId;
      if (response.length == 0) {
        const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
        chatId = await chatsDao.insertIntoChat(chatsModel.createdBy, currentDate);
        if (chatId) {
          const chatMembersMappingModelArray = new ChatsDelegate().generateArrayForInsert(chatId, chatsModel);
          await chatsDao.insertIntoChatMembersMapping(chatMembersMappingModelArray);
          response = chatId;
        }
      }
      else {
        chatId = response[0].fk_chat_chatMembersMapping;
      }

      return new DirectMessageMembersModel(chatId);
    }
    catch (err) {
      console.log(err);

      throw new ExceptionHandler(err);
    }
  }

  generateArrayForInsert(chatId, chatsModel) {
    const chatMembersMappingModelArray = [];
    chatsModel.ids.forEach(element => {
      chatMembersMappingModelArray.push([chatId, element]);
    });
    return chatMembersMappingModelArray;
  }

  async getGroupsForUser(ids) {
    try {
      return await new ChatsDao().getGroupsForUser(ids);
    }
    catch (err) {
      throw new ExceptionHandler(err);
    }

  }

  async getChatsAssociatedWithUser(id) {
    try {
      const response = await new ChatsDao().getChatsAssociatedWithUser(id);
      let chatId = 0;
      let members = [];
      const directMessageMembersModelList = [];
      response.forEach((element, index) => {
        if (element.fk_chat_chatMembersMapping != chatId && chatId != 0) {
          directMessageMembersModelList.push(new DirectMessageMembersModel(chatId, members));
          chatId = element.fk_chat_chatMembersMapping;
          members = [];
        }
        chatId = element.fk_chat_chatMembersMapping;
        members.push(new UserModel(element.id, element.firstName, element.lastName, element.email));
        if (index === response.length - 1) {
          directMessageMembersModelList.push(new DirectMessageMembersModel(chatId, members));
        }
      });
      return directMessageMembersModelList;
    }
    catch (err) {
      throw new ExceptionHandler(err);
    }
  }
}

export default ChatsDelegate;