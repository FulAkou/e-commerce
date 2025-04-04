const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Admin",
    email: "admin@me.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "User",
    email: "user@me.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

module.exports = users;
