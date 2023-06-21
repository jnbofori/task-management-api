const mongoose = require('mongoose');

const SUPPORTED_TASK_STATUSES = [
  'pending',
  'completed',
  'deleted'
];

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2
  },
  description: {
    type: String,
    required: true,
    minlength: 5
  },
  status: {
    type: String,
    required: true,
    default: 'pending',
    enum: SUPPORTED_TASK_STATUSES
  }
}, {
  timestamps: {
    createdAt: "created",
    updatedAt: "modified"
  }
});

taskSchema.index({ "$**": "text" });

module.exports = mongoose.model('Task', taskSchema);