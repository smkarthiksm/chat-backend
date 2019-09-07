import ChatsDelegate from '../delegates/ChatsDelegate';
import ChatsModel from '../models/ChatsModel';
import * as JWTUtility from '../utilities/JWTUtility';
class ChatsController {

  async createNewDirectMessage(req, res, next) {
    try {
      const payload = JWTUtility.getJWTPayload(req);
      const chatsModel = new ChatsModel(payload.id, req.body.ids);
      return res.send(await new ChatsDelegate().createNewDirectMessage(chatsModel));
    }
    catch (err) {
      next(err);
    }
  }

  async getChatsAssociatedWithUser(req, res, next) {
    try {
      const payload = JWTUtility.getJWTPayload(req);
      return res.send(await new ChatsDelegate().getChatsAssociatedWithUser(payload.id));
    }
    catch (err) {
      console.log(err);
      next(err);
    }
  }
}
export default ChatsController;