const jwt = require('jsonwebtoken');
const users = require('../models/users');
require('dotenv').config();

exports.login = async (req, res) => {
try{
    const { email, password } = req.body;
    const user = await users.findOne({
        where:{ email:email, password:password }     
    });
    if (!user) {
    return res.status(401).send('Invalid credentials');
  }
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });}
  catch(error)
  { res.status(500).json({ message: 'Error Creating Token' });
  }



};