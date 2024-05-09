const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) return res.sendStatus(403);
      const dbUser = await prisma.token.findFirst({
        where: { token }
      });
      if (!dbUser) return res.sendStatus(401);
      req.user = decoded;
      next();
    });
    
  };
  
  module.exports = authenticateToken;