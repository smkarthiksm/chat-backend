import UserDelegate from '../delegates/UserDelegate';
class UserController {
  async getByName(req, res, next) {
    try {
      return res.send(await new UserDelegate().getByName(req.query.name));
    }
    catch (err) {
      next(err);
    }
  }
}
export default UserController;