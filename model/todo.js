const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({    
    
    description: {type: String, required:true}, 
    priority: {type: String, required:true, uppercase: true},
    deadlineDate: {type: Date, required: true},

})

const Todo  = mongoose.model("task", todoSchema);
module.exports = Todo;