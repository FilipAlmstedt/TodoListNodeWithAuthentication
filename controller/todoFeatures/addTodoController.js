const Todo = require("../../model/todo");


const addTodoItem = async (req,res) => {
    try {
        await new Todo({
            description: req.body.description,
            priority: req.body.priority,
            deadlineDate: req.body.deadlineDate,
        }).save();
        res.redirect("/");
    }
    catch (err) {
        res.render("error.ejs", {error: err})
    }   
}

module.exports = addTodoItem;