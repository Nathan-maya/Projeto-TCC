const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');

//Register
router.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET,
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json('Houve um erro Inesperado, tente novamente mais tarde');
  }
});

//Login

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    if(!user){
      return res.status(401).json('Usuário ou senha incorreta!');
    }
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET,
    );
    const OriginPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if(OriginPassword !== req.body.password) {
      return res.status(401).json('Usuário ou senha incorreta!');
    }

    const { password, ...others } = user._doc;
    return res.status(200).json({ ...others });
  } catch (err) {
    return res.status(500).json('não foi possivel completar login' + err);
  }
});

module.exports = router;
