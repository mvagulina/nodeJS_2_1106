let Users = require("../db/models/users");

module.exports = {
  async createAccount(req, res) {
    try {
      let { login, password, basket } = req.body;
      let newItem = await Users.create({ login, password, basket });
      res.json({ _id: newItem._id });
    } catch (error) {
      console.log(`Error create user: ${error}`);
      res.json({ status: false });
    }
  },
  async login(req, res) {
    let { login, password } = req.body;
    try {
      let users = await Users.find({ login: login, password: password });
      if (users.length) {
        let user = users[0];
        res.json({ _id: user._id, basket: user.basket });
      }
    } catch (error) {
      console.log(`Error login user ${login}: ${error}`);
      res.json({ status: false });
    }
  },
};
