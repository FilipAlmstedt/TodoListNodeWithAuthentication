const Todo = require("../../model/todo");


const addTodoItem = async (req,res) => {
    const {sortedDate, page} = req.body;
    try {
        const newTask = await new Todo({
            description: req.body.description,
            priority: req.body.priority,
            deadlineDate: req.body.deadlineDate,
        }).save();
    
        newTask.addUser(req.user.user._id); 

        res.redirect("/?page="+page+"&&sortedDate="+sortedDate);
    }
    catch (err) {
        res.render("error.ejs", {error: err})
    }   
}

module.exports = addTodoItem;