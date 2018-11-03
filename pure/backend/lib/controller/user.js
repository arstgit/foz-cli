module.exports = {
  async getUser(c, s, a) {
    let name = a.config.name;
    await s.user.getInfo();
    c.body = name;
  }
};
