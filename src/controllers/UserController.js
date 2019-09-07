import * as JWTUtility from '../utilities/JWTUtility';
import UserDelegate from '../delegates/UserDelegate';

class UserController {
  async getByName(req, res, next) {
    try {
      const payload = JWTUtility.getJWTPayload(req);
      return res.send(await new UserDelegate().getByName(req.query.name,payload.id));
    }
    catch (err) {
      next(err);
    }
  }
}
export default UserController;