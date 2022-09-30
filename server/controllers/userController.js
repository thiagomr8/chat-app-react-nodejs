const User = require("../models/userModel");

module.exports.login = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const user = await User.findOne({ username });
    const emailCheck = await User.findOne({ email });
    if (user && emailCheck) {
      return res.json({ status: true, user });
    } else if (user) {
      return res.json({
        status: false,
        msg: "Usuário encontrado não confere com o email informado",
      });
    } else if (emailCheck) {
      return res.json({
        status: false,
        msg: "Email encontrado não confere com o usuário informado",
      });
    } else {
      const user = await User.create({
        email,
        username,
      });
      return res.json({ status: true, user });
    }
  } catch (ex) {
    next(ex);
  }
  // try {
  //   const { username, email } = req.body;
  //   const user = await User.findOne({ username });
  //   if (!user)
  //     return res.json({ msg: "Incorrect Username or Password", status: false });
  //   // const isPasswordValid = await bcrypt.compare(password, user.password);
  //   if (!isPasswordValid)
  //     return res.json({ msg: "Incorrect Username or Password", status: false });
  //   delete user.password;
  //   return res.json({ status: true, user });
  // } catch (ex) {
  //   next(ex);
  // }
};

// module.exports.register = async (req, res, next) => {};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
      "admin",
    ]);
    // console.log(users);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};

// module.exports.logOut = (req, res, next) => {
//   try {
//     if (!req.params.id) return res.json({ msg: "User id is required " });
//     onlineUsers.delete(req.params.id);
//     return res.status(200).send();
//   } catch (ex) {
//     next(ex);
//   }
// };
