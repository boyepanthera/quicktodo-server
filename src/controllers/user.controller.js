const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUserController = async function (req, res) {
  const users = await prisma.user.findMany({});
  res.json({
    message: "users fetched",
    users,
  });
};

const getUserById = async (req, res) => {
  const oneUser = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      id: true,
      email: true,
    },
  });
  res.json({
    message: "user fetched",
    user: oneUser,
  });
};

module.exports.getUserController = getUserController;
module.exports.getUserById = getUserById;
