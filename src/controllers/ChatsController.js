import ChatsDelegate from '../delegates/ChatsDelegate';
import * as JWTUtility from '../utilities/JWTUtility';
class ChatsController {

  async createNewDirectMessage(req, res, next) {
    try {
      const JWTpayload = JWTUtility.getJWTPayload(req);
      return res.send(await new ChatsDelegate().createNewDirectMessage(JWTpayload.id, req.body.ids));
    }
    catch (err) {
      next(err);
    }
  }

  async getChatsAssociatedWithUser(req, res, next) {
    try {
      const JWTpayload = JWTUtility.getJWTPayload(req);
      return res.send(await new ChatsDelegate().getChatsAssociatedWithUser(JWTpayload.id));
    }
    catch (err) {
      console.log(err);
      next(err);
    }
  }

  async getChatMessages(req, res, next) {
    try {
      const JWTpayload = JWTUtility.getJWTPayload(req);
      return res.send(await new ChatsDelegate().getChatMessages(JWTpayload.id, req.query.chatId));
    }
    catch (err) {
      console.log(err);
      next(err);
    }
  }

  async insertNewMessage(req, res, next) {
    try {
      const JWTpayload = JWTUtility.getJWTPayload(req);
      console.log(req.body);
      
      return res.send(await new ChatsDelegate().insertNewMessage(JWTpayload.id, req.body));
    }
    catch (err) {
      next(err);
    }
  }
}
export default ChatsController;