const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const CreateTaskController = async (req, res) => {
  try {
    let task = await prisma.task.create({
      data: { ...req.body, userId: req.user.id },
    });
    return res.status(201).json({
      task,
      message: "task created",
    });
  } catch {
    return res.status(400).json({
      message: "unable to create task",
    });
  }
};

const FetchTasksController = async (req, res) => {
  try {
    let task = await prisma.task.findMany({
      where: {
        userId: req.user.id,
      },
    });
    return res.status(200).json({
      task,
      message: "tasks fetched",
    });
  } catch {
    return res.status(400).json({
      message: "unable to fetch tasks",
    });
  }
};

const FetchTaskByIdController = async (req, res) => {
  try {
    let task = await prisma.task.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (req.user.id === task.userId) {
      return res.status(200).json({
        task,
        message: "task fetched",
      });
    }
    return res.status(403).json({
      message: "forbidden",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "unable to fetch task",
    });
  }
};

const UpdateTaskController = async (req, res) => {
  try {
    let taskChecked = await prisma.task.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (taskChecked.userId === req.user.id) {
      let task = await prisma.task.update({
        where: { id: req.params.id },
        data: req.body,
      });
      return res.status(200).json({
        task,
        message: "task updated",
      });
    } else {
      return res.status(403).json({
        message: "forbidden",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "unable to update task",
    });
  }
};

const DeleteTaskController = async (req, res) => {
  try {
    let taskChecked = await prisma.task.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (taskChecked.userId === req.user.id) {
      let task = await prisma.task.delete({
        where: { id: req.params.id },
      });
      return res.status(200).json({
        task,
        message: "task deleted",
      });
    }
    return res.status(403).json({
      message: "forbidden",
    });
  } catch {
    return res.status(400).json({
      message: "unable to delete task",
    });
  }
};

module.exports.CreateTaskController = CreateTaskController;
module.exports.FetchTasksController = FetchTasksController;
module.exports.FetchTaskByIdController = FetchTaskByIdController;
module.exports.UpdateTaskController = UpdateTaskController;
module.exports.DeleteTaskController = DeleteTaskController;
