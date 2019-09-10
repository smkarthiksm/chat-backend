import moment from 'moment';

import ChatsDao from '../daos/ChatsDao';
import ChatMembersModel from '../models/ChatMembersModel';
import ExceptionHandler from '../exceptions/ExceptionHandler';
import ChatMessageModel from '../models/ChatMessageModel';
import UserModel from '../models/UserModel';

class ChatsDelegate {

  async createNewDirectMessage(id, memberIds) {
    try {
      const chatsDao = new ChatsDao();
      memberIds.map((elem, index) => {
        if (elem === id) {
          memberIds.splice(index, 1);
        }
      });
      memberIds.push(id);
      let response = await chatsDao.getGroupsForUser(memberIds);
      let chatId;
      if (response.length == 0) {
        const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
        chatId = await chatsDao.insertIntoChat(id, currentDate);
        if (chatId) {
          const chatMembersModelArray = new ChatsDelegate().generateArrayForInsert(chatId, memberIds);
          await chatsDao.insertIntoChatMembers(chatMembersModelArray);
          response = chatId;
        }
      }
      else {
        chatId = response[0].fk_chat_chatMembers;
      }

      return new ChatMembersModel(chatId);
    }
    catch (err) {
      throw new ExceptionHandler(err);
    }
  }

  generateArrayForInsert(chatId, chatsModel) {
    const chatMembersModelArray = [];
    chatsModel.ids.forEach(element => {
      chatMembersModelArray.push([chatId, element]);
    });
    return chatMembersModelArray;
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
      const ChatMembersModelList = [];
      response.forEach((element, index) => {
        if (element.fk_chat_chatMembers != chatId && chatId != 0) {
          ChatMembersModelList.push(new ChatMembersModel(chatId, members));
          chatId = element.fk_chat_chatMembers;
          members = [];
        }
        chatId = element.fk_chat_chatMembers;
        members.push(new UserModel(element.id, element.firstName, element.lastName, element.email));
        if (index === response.length - 1) {
          ChatMembersModelList.push(new ChatMembersModel(chatId, members));
        }
      });
      return ChatMembersModelList;
    }
    catch (err) {
      throw new ExceptionHandler(err);
    }
  }
  async getChatMessages(id, chatId) {
    try {
      let isChatExists = await new ChatsDao().getChatForUser(id, chatId);
      const response = {};
      if (isChatExists.length > 0) {
        const chatMessages = await new ChatsDao().getChatMessages(chatId);
        const chatMembers = await new ChatsDao().getChatMembers(id, chatId);
        let chatMessageModel = [];
        chatMessages.forEach(element => {
          let userModel = new UserModel(element.userId, element.firstName, element.lastName, element.email, element.phoneNumber);
          chatMessageModel.push(new ChatMessageModel(element.id, element.message, element.createdAt, userModel));
        });

        response.chatMembers = chatMembers;
        response.messages = chatMessages;
      }
      return response;
    }
    catch (err) {
      throw new ExceptionHandler(err);
    }
  }

  async insertNewMessage(userId, chatBody) {
    try {
      console.log(userId);

      let isChatExists = await new ChatsDao().getChatForUser(userId, chatBody.chatId);
      if (isChatExists.length > 0) {
        const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
        const response = await new ChatsDao().insertNewMessage(userId, chatBody, currentDate);
        return response;
      }
    }
    catch (err) {
      throw new ExceptionHandler(err);
    }
  }
}

export default ChatsDelegate;