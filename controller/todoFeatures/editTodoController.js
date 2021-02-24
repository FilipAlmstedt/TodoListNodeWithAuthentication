const Todo = require("../../model/todo");


const renderEditTodoItem = async (req,res) => {
    const {sortedDate, page} = req.query;
    const data = await Todo.find();
    const chosenItem = await Todo.findOne({_id:req.params.id}); 
    res.render("editItem.ejs", {chosenItem: chosenItem, data: data, error: "emptyString",sortedDate, page})
}

const editTodoItem = async (req,res) => {

    const {sortedDate, page} = req.body;

    await Todo.updateOne(
        {_id: req.body.id},
        {description: req.body.description,
        priority: req.body.priority,
        deadlineDate: req.body.deadlineDate},
    )
    res.redirect("/?page="+page+"&&sortedDate="+sortedDate);
}

module.exports = {editTodoItem,renderEditTodoItem};