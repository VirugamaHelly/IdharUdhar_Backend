// const nodemailer = require('nodemailer');
// const crypto = require('crypto');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');

// // Hardcoded credentials for testing (replace with real Gmail + App Password)
// const EMAIL_USER = 'krishnapanchal822006@gmail.com';
// const EMAIL_PASS = 'kiaxkxiqkpbxbudd';
// const JWT_SECRET = 'myjwtsecret';

// // Nodemailer transporter setup
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: EMAIL_USER,
//     pass: EMAIL_PASS
//   }
// });

// // Sign-Up Controller
// exports.signup = async (req, res) => {
//   const { name, email, password, confirmPassword, role } = req.body;

//   if (password !== confirmPassword) {
//     return res.status(400).json({ message: 'Passwords do not match' });
//   }

//   let userExists = await User.findOne({ email });
//   if (userExists) {
//     return res.status(400).json({ message: 'Email already exists' });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = new User({
//     name,
//     email,
//     password: hashedPassword,
//     role
//   });

//   await newUser.save();
//   res.status(201).json({ message: 'User created successfully. Please verify email' });
// };

// // Send OTP Controller
// exports.sendOtp = async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ message: 'Email is required' });
//   }

//   const otp = crypto.randomInt(100000, 999999);

//   let user = await User.findOne({ email });
//   if (!user) {
//     return res.status(404).json({ message: 'User not found' });
//   }

//   user.otp = otp;
//   user.otpExpiry = Date.now() + 5 * 60 * 1000;
//   await user.save();

//   const mailOptions = {
//     from: EMAIL_USER,
//     to: email,
//     subject: 'OTP for Authentication',
//     text: `Your OTP is: ${otp}`
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     return res.status(200).json({ message: 'OTP sent successfully' });
//   } catch (error) {
//     console.error('Error sending OTP:', error);
//     return res.status(500).json({ message: 'Error sending OTP' });
//   }
// };

// // Verify OTP Controller
// exports.verifyOtp = async (req, res) => {
//   const { email, otp } = req.body;

//   if (!email || !otp) {
//     return res.status(400).json({ message: 'Email and OTP are required' });
//   }

//   let user = await User.findOne({ email });
//   if (!user) {
//     return res.status(404).json({ message: 'User not found' });
//   }

//   if (Date.now() > user.otpExpiry) {
//     return res.status(400).json({ message: 'OTP has expired' });
//   }

//   if (user.otp !== parseInt(otp)) {
//     return res.status(400).json({ message: 'Invalid OTP' });
//   }

//   user.isVerified = true;
//   user.otp = null;
//   user.otpExpiry = null;
//   await user.save();

//   return res.status(200).json({ message: 'OTP verified successfully' });
// };

// // Login (Send OTP)
// exports.login = async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ message: 'Email is required' });
//   }

//   let user = await User.findOne({ email });
//   if (!user) {
//     return res.status(404).json({ message: 'User not found' });
//   }

//   const otp = crypto.randomInt(100000, 999999);
//   user.otp = otp;
//   user.otpExpiry = Date.now() + 5 * 60 * 1000;
//   await user.save();

//   const mailOptions = {
//     from: EMAIL_USER,
//     to: email,
//     subject: 'Login OTP',
//     text: `Your OTP for login is: ${otp}`
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     return res.status(200).json({ message: 'OTP sent successfully for login' });
//   } catch (error) {
//     console.error('Error sending OTP:', error);
//     return res.status(500).json({ message: 'Error sending OTP' });
//   }
// };

// // Verify Login OTP and generate JWT
// exports.verifyLoginOtp = async (req, res) => {
//   const { email, otp } = req.body;

//   if (!email || !otp) {
//     return res.status(400).json({ message: 'Email and OTP are required' });
//   }

//   let user = await User.findOne({ email });
//   if (!user) {
//     return res.status(404).json({ message: 'User not found' });
//   }

//   if (Date.now() > user.otpExpiry) {
//     return res.status(400).json({ message: 'OTP has expired' });
//   }

//   if (user.otp !== parseInt(otp)) {
//     return res.status(400).json({ message: 'Invalid OTP' });
//   }

//   const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
//     expiresIn: '1h'
//   });

//   return res.status(200).json({ message: 'Login successful', token });
// };





const nodemailer = require('nodemailer');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Hardcoded credentials for testing (replace with real Gmail + App Password)

const EMAIL_USER = 'krishnapanchal822006@gmail.com';
const EMAIL_PASS = 'kiaxkxiqkpbxbudd';
const JWT_SECRET = 'myjwtsecret';

// Nodemailer transporter setup

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
});

// Sign-Up Controller

exports.signup = async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  let userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role
  });

  await newUser.save();
  res.status(201).json({ message: 'User created successfully. Please verify email' });
};

// Send OTP Controller

exports.sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const otp = crypto.randomInt(100000, 999999);

  let user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.otp = otp;
  user.otpExpiry = Date.now() + 5 * 60 * 1000;
  await user.save();

  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: 'OTP for Authentication',
    text: `Your OTP is: ${otp}`
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return res.status(500).json({ message: 'Error sending OTP' });
  }
};

// Verify OTP Controller

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  let user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (Date.now() > user.otpExpiry) {
    return res.status(400).json({ message: 'OTP has expired' });
  }

  if (user.otp !== parseInt(otp)) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  return res.status(200).json({ message: 'OTP verified successfully' });
};

// Login (Send OTP)

exports.login = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  let user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const otp = crypto.randomInt(100000, 999999);
  user.otp = otp;
  user.otpExpiry = Date.now() + 5 * 60 * 1000;
  await user.save();

  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: 'Login OTP',
    text: `Your OTP for login is: ${otp}`
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'OTP sent successfully for login' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return res.status(500).json({ message: 'Error sending OTP' });
  }
};

// Verify Login OTP and generate JWT

exports.verifyLoginOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  let user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (Date.now() > user.otpExpiry) {
    return res.status(400).json({ message: 'OTP has expired' });
  }

  if (user.otp !== parseInt(otp)) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: '1h'
  });

  return res.status(200).json({ message: 'Login successful', token });
};
