class Test {
  async signup(req, res, next) {
    try {
      return res.send("response");
    }
    catch (err) {
      next(err);
    }
  }
}
export default Test;