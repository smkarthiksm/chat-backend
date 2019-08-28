import ChatsDelegate from '../delegates/ChatsDelegate';
import ChatsModel from '../models/ChatsModel';
class ChatsController {

  async createNewDirectMessage(req, res, next) {
    try {
      const chatsModel = new ChatsModel(req.body.createdById, req.body.ids);
      return res.send(await new ChatsDelegate().createNewDirectMessage(chatsModel));
    }
    catch (err) {
      next(err);
    }
  }
}
export default ChatsController;