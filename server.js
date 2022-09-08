const express = require('express');
const server = express();
const { authController } = require('./src/controllers/auth.controller');
const validateAuthData = require('./src/validators/auth.validator');
const { PrismaClient } = require('@prisma/client');
const {
  checkIfAuthenticated,
} = require('./src/controllers/middlewares/auth.middleware');
const {
  validateTaskData,
  validateTaskUpdateData,
} = require('./src/validators/task.validator');
const {
  CreateTaskController,
  FetchTasksController,
  UpdateTaskController,
  FetchTaskByIdController,
  DeleteTaskController,
} = require('./src/controllers/task.controller');
const prisma = new PrismaClient();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

async function connect() {
  await prisma.$connect();
}

server.get('/', (req, res) => {
  res.json({
    message: 'Hello world!',
  });
});

server.get('/user/', async (req, res) => {
  const users = await prisma.user.findMany({});
  res.json({
    message: 'users fetched',
    users,
  });
});

server.get('/user/:id', checkIfAuthenticated, async (req, res) => {
  const oneUser = await prisma.user.findUnique({
    where: req.user.id,
  });
  res.json({
    message: 'user fetched',
    user: oneUser,
  });
});

server.post('/auth', validateAuthData, authController);

server.get('/task', checkIfAuthenticated, FetchTasksController);

server.post(
  '/task',
  checkIfAuthenticated,
  validateTaskData,
  CreateTaskController
);

server.get('/task/:id', checkIfAuthenticated, FetchTaskByIdController);

server.put(
  '/task/:id',
  checkIfAuthenticated,
  validateTaskUpdateData,
  UpdateTaskController
);

server.delete(
  '/task/:id',
  checkIfAuthenticated,
  validateTaskUpdateData,
  DeleteTaskController
);

server.all('*', (req, res) =>
  res.status(404).json({ message: 'route not found' })
);

server.listen(4002, async () => {
  connect()
    .then(() => console.log('connected to db'))
    .catch((err) => console.error('issues connecting to db' + err.message));
  console.log('quicktodo running on port 4002');
});
