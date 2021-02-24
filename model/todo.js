const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({    
    
    description: {type: String, required:true}, 
    priority: {type: String, required:true, uppercase: true},
    deadlineDate: {type: Date, required: true},
    user: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ]
})

todoSchema.methods.addUser = function(todoID){
    this.user.push(todoID);
    this.save();
}

const Todo  = mongoose.model("todo", todoSchema);

module.exports = Todo;