import Task from "../model/tasks/task-model.js";
import User from "../model/users/user-model.js";

export const newTaskController = async (req, res) => {
  const { name, status } = req.body;
  try {
    const userFound = await User.findOne({ _id: req.userAuth });
    if (!userFound) return res.json({ status: "error", message: "Oop! Invalid credential, kindly login before accessing this page" });

    // task can be repeated hence comment checking of existing task
    // const foundTask = await Task.findOne({name: name, userId: userFound.email})
    //     if(foundTask) return res.json({status: "error", message: "Task already been added!"})
 
    const task = await Task.create({
      name,
      userId: req.userAuth,
      status
    });

    if (!task) return res.json({status: "error", message: "Network Error!"})

    res.json({
      status: "sucess",
      data: {
        id: task._id,
        name: task.name,
        status: task.status,
        isCompleted: task.isCompleted
      },
    });
  } catch (error) {
    res.json(error.message);
  }
};

export const tasksController = async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.json({
      status: "sucess",
      data: tasks,
    });
  } catch (error) {
    res.json(error.message);
  }
};

export const getUserTasksController = async (req, res) => {
  const userId = req.userAuth
  try {
    const tasks = await Task.find({userId: userId})
    res.json({
      status: "sucess",
      data: tasks,
    });
  } catch (error) {
    res.json(error.message);
  }
};

export const getUserTasksNotCompletedController = async (req, res) => {
  const userId = req.userAuth
  try {
    const tasks = await Task.find({userId: userId, isCompleted: false})
    res.json({
      status: "sucess",
      data: tasks,
    });
  } catch (error) {
    res.json(error.message);
  }
};

export const getTaskController = async (req, res) => {
    const {id} = req.params;
    try {
        const foundTask = await Task.findById({_id: id})
        if(!foundTask) return res.json({status: "error", message: "Task not found!"})

      res.json({
        status: "sucess",
        data: foundTask,
      });

    } catch (error) {
      res.json(error.message);
    }
  };
  
  export const deleteTaskController = async (req, res) => {
    const {id} = req.params;
    try {
      const task = await Task.findOneAndDelete({_id: id})
      if(!task) return res.json({status: "error", message: "Task not found!"})

      res.json({
        status: "sucess",
        data: task,
      });
    } catch (error) {
      res.json(error.message);
    }
  };

export const updateTaskController = async (req, res) => {
  const {id} = req.params;
  const { name, status } = req.body
  try {

    let {isCompleted} = false
    if(status === 'completed') isCompleted = true


    const foundTask = await Task.findOneAndUpdate({_id: id}, {name, status, isCompleted}, {
      new: true,
      runValidators: true
    })
    if(!foundTask) return res.json({status: "error", message: "No task found!"})

    res.json({
      status: "sucess",
      data: `${foundTask.name}, has been updated sucessfully`,
    });
  } catch (error) {
    res.json(error.message);
  }
};

export const patchTaskController = async (req, res) => {
  const {id} = req.params;
  const { status } = req.body
  try {
    let {isCompleted} = false
    if(status === 'completed') isCompleted = true

    const foundTask = await Task.findOneAndUpdate({_id: id}, {status, isCompleted}, {
      new: true,
      runValidators: true
    })
    if(!foundTask) return res.json({status: "error", message: "No task found!"})

    res.json({
      status: "sucess",
      data: `${foundTask.name}, completion has been changed to ${isCompleted}`,
    });
  } catch (error) {
    res.json(error.message);
  }
};
