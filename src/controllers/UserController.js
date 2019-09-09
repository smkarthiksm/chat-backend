import * as JWTUtility from '../utilities/JWTUtility';
import UserDelegate from '../delegates/UserDelegate';

class UserController {
  async getByName(req, res, next) {
    try {
      const JWTPayload = JWTUtility.getJWTPayload(req);
      return res.send(await new UserDelegate().getByName(req.query.name, JWTPayload.id));
    }
    catch (err) {
      next(err);
    }
  }
}
export default UserController;