const express = require('express');
const cors = require('cors');
const server = express();
const { authController } = require('./src/controllers/auth.controller');
const validateAuthData = require('./src/validators/auth.validator');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
dotenv.config();
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
const {
  getUserController,
  getUserById,
} = require('./src/controllers/user.controller');
const prisma = new PrismaClient();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.options('*', cors());

async function connect() {
  await prisma.$connect();
}

server.get('/', (req, res) => {
  res.json({
    message: 'Hello world!',
  });
});

server.get('/user/', getUserController);

server.get('/user/:id', checkIfAuthenticated, getUserById);

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

let port = 4002;
if (process.env.NODE_ENV !== 'dev') {
  port = process.env.PORT;
}

server.listen(port, async () => {
  connect()
    .then(() => console.log('connected to db'))
    .catch((err) => console.error('issues connecting to db' + err.message));
  console.log('quicktodo running on port ' + port);
});
