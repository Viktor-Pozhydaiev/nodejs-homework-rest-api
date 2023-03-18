const { User } = require("../models/user");

const bcrypt = require("bcrypt");

const path = require("path");

const gravatar = require("gravatar");

const { HttpError, contrWrapper, sendEmail } = require("../utils");

const jwt = require("jsonwebtoken");

const fs = require("fs/promises");

const Jimp = require("jimp");

const { v4: uuid } = require("uuid");

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////

const verificationToken = uuid();

const { SECRET_KEY, BASE_URL } = process.env;

const avatarsDir = path.join(__dirname, "../public/avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPass = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPass,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email!",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/users/verify/${verificationToken}" > Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });

  res.json({
    message: "Email verify success",
  });
};

const resendVerify = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email, verify: false });

  if (!email) {
    throw HttpError(400, "Missing required field email");
  }

  if (!user) {
    throw HttpError(401, "Email not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verificationToken = user.verificationToken;

  const verifyEmail = {
    to: email,
    subject: "Verify email!",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/users/verify/${verificationToken}" > Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verification successful",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid!");
  }
  if (!user.verify) {
    throw HttpError(401, "Email not verified");
  }

  const passCompare = await bcrypt.compare(password, user.password);
  if (!passCompare) {
    throw HttpError(401, "Email or password invalid!");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
  });
};

const logOut = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({ message: "Logout success." });
};

const getCurrent = async (req, res) => {
  const { email, name } = req.user;
  res.json({
    email,
    name,
  });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  const { path: tmpUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarsDir, filename);

  const avatarURL = path.join("avatars", filename);

  await Jimp.read(tmpUpload, (err, url) => {
    if (err) throw err;
    url
      .resize(250, 250) // resize
      .quality(60)
      .write(tmpUpload);
  });

  await fs.rename(tmpUpload, resultUpload);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = {
  register: contrWrapper(register),
  login: contrWrapper(login),
  getCurrent: contrWrapper(getCurrent),
  logOut: contrWrapper(logOut),
  updateAvatar: contrWrapper(updateAvatar),
  verifyEmail: contrWrapper(verifyEmail),
  resendVerify: contrWrapper(resendVerify),
};
