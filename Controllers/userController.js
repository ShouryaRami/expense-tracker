let User = require("../models/userModel");

const createUser = (req, res) => {
  try {
    let { username, password } = req.body;
    let data = new User({ username: username, password });
    data
      .save()
      .then((response) => {
        console.log("response", response);
        res.send({ isSuccess: true, message: response });
      })
      .catch((err) => {
        console.log(err);
        res.send({ isSuccess: false, message: err });
      });
  } catch (err) {
    console.log(err);
    res.send({ isSuccess: false, message: err });
  }
};

const findUsers = (req, res) => {
  try {
    User.find()
      .then((response) => {
        res.send({ isSuccess: true, data: response });
      })
      .catch((err) => {
        res.send({ isSuccess: false, message: err });
      });
  } catch (err) {
    console.log(err);
    res.send({ isSuccess: false, message: err });
  }
};

const findUser = (req, res) => {
  try {
    let { username } = req.query;
    User.find({ username: username })
      .then((response) => {
        res.send({ isSuccess: true, data: response });
      })
      .catch((err) => {
        res.send({ isSuccess: false, message: err });
      });
  } catch (err) {
    console.log(err);
    res.send({ isSuccess: false, message: err });
  }
};

const updateUser = (req, res) => {
    try {
      let { id } = req.query;
      let { password } = req.body;

      
    //   User.findOneAndUpdate({ _id: id }, {password:password})
    //     .then((response) => {
    //       res.send({ isSuccess: true, data: response });
    //     })
    //     .catch((err) => {
    //       res.send({ isSuccess: false, message: err });
    //     });
    } catch (err) {
      console.log(err);
      res.send({ isSuccess: false, message: err });
    }
  };

module.exports = { createUser, findUsers, findUser, updateUser };
