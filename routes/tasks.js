const express = require('express');
const assert = require('assert');
const router = express.Router();
const Task = require('../models/Task');
const { taskValidation, taskQueryValidation } = require('../validation');

//GET ALL TASKS
router.get('/', async (req, res) => {
  try {
    const { error } = taskQueryValidation(req.query)
    if(error) return res.status(400).send(error.details[0].message);

    const { search, status } = req.query;
    const query = { status: { $ne: 'deleted' } };
    if (search) {
      query.$text = {
        $search: search
      }
    }
    if (status) {
      query.status = status
    }
    const tasks = await Task.find(query).sort({ modified: -1 });
    res.send(tasks);
  } catch (e) {
    res.status(400).send(e.message);
  }
});


//CREATE A NEW TASK
router.post('/', async (req, res) => {
  //Validate data
  const { error } = taskValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const task = new Task({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const savedTask = await task.save();
    res.send(savedTask);
  }catch (e) {
    res.status(400).send(e.message)
  }
});

// UPDATE A TASK
router.put('/:taskId', async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const { title, description, status } = req.body
    if (status) {
      assert(['pending', 'completed'].includes(status), 'Invalid status')
    }

    const task = await Task.findOne({_id: req.params.taskId, status: { $ne: 'deleted' }});
    assert(task, 'Task not found')

    const updateObject = {
      title,
      description,
      status
    }
    Object.keys(updateObject).forEach(key => !updateObject[key] && delete updateObject[key])

    const updatedTask = await Task.updateOne({_id: taskId}, updateObject);
    res.send({ "Response sent": `${updatedTask.nModified} document(s) modified`});
  }catch (e) {
    console.log(e)
    res.status(400).send(e.message);
  }
});


// GET SINGLE TASK
router.get('/:taskId', async (req, res) => {
  try {
    const task = await Task.findOne({_id: req.params.taskId, status: { $ne: 'deleted'}});
    assert(task, 'Task not found');
    res.send(task);
  }catch (e) {
    res.status(400).send(e.message)
  }
});


// COMPLETE A TASK
router.post('/complete/:taskId', async (req, res) => {
  try {
    const task = await Task.findOne({_id: req.params.taskId, status: { $ne: 'deleted'}});
    assert(task, 'Task not found')

    task.status = 'completed'
    const savedTask = await task.save()

    res.send(savedTask);
  }catch (e) {
    res.status(400).send(e.message)
  }
});


// DELETE A TASK
router.delete('/:taskId', async (req, res) =>{
  try {
    await Task.updateOne({_id: req.params.taskId},
      {
        status: 'deleted'
      }
    );
    res.send({ "Response sent": 'Task deleted successfully'});
  }catch (e) {
    res.status(400).send(e.message)
  }
})

module.exports = router;