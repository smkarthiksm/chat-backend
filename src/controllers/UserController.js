import UserDelegate from '../delegates/UserDelegate';
class UserController {
  async signup(req, res, next) {
    try {
      const response = await new UserDelegate().signup(req.body);
      return res.send(response);
    }
    catch (err) {      
      next(err);
    }
  }
}
export default UserController;