const { PrismaClient } = require('@prisma/client');
const Jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

const authController = async (req, res) => {
  const saltRounds = 10;
  const { email, password: plainPassword } = req.body;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(plainPassword, salt, async function (err, password) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      const existingUsersWithEmail = await prisma.user.findMany({
        where: {
          email: email,
        },
      });
      let user;
      if (!existingUsersWithEmail.length) {
        user = await prisma.user.create({
          data: {
            email,
            password,
          },
        });
      } else {
        user = existingUsersWithEmail[0];
      }
      const token = await Jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '6h' }
      );
      return res.status(200).json({
        message: 'login successful',
        token,
      });
    });
  });
};

module.exports.authController = authController;
