const prisma = require('../config/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword }
    });
    res.status(201).send('User created successfully.');
  } catch (error) {
    console.error("Registration error:", error);
    if (error.code === 'P2002') {  // Prisma's unique constraint error code
      return res.status(409).send('Email already in use.');
    }
    res.status(500).send('Internal Server Error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).send('Invalid credentials');
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
  await prisma.token.create({ data: { token, userId: user.id, expiresAt: new Date(Date.now() + 24*60*60*1000) } });
  res.json({ token });
};

exports.logout = async (req, res) => {
  await prisma.token.delete({ where: { token: req.headers['authorization'].split(' ')[1] } });
  res.send('Logged out successfully.');
};