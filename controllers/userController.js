const userService = require("../services/userService");

// getHomePage
exports.getHomePage = (req, res, next) => {
  res.status(200).send("HI i am Dinesh.");
};

// register
exports.register = (req, res, next) => {
  userService
    .register(req.body)
    .then((r) => {
      res.json({
        _id: r._id,
        usernames: r.username,
        status: "Created",
        token: r.token,
      });
    })
    .catch((err) => next(err));
};

// authenticate
exports.authenticate = (req, res, next) => {
  userService
    .authenticate(req.body)
    .then((user) =>
      user
        ? res.json({
          "id": user._id,
          "token": user.token
        })
        : res.status(400).json({ message: "Username or password is incorrect" })
    )
    .catch((err) => next(err));
};
