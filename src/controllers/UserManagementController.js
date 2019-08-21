import UserManagementDelegate from '../delegates/UserManagementDelegate';
class UserManagementController {
  async signup(req, res, next) {
    try {
      const response = await new UserManagementDelegate().signup(req.body);
      return res.send(response);
    }
    catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const response = await new UserManagementDelegate().login(req.body);
      return res.send(response);
    }
    catch (err) {
      console.log(err);
      
      next(err);
    }
  }
}
export default UserManagementController;