const Todo = require("../../model/todo");

const deleteTodoItem = async (req,res) => {
   
    const {sortedDate, page} = req.query;
    console.log(req.query)

    await Todo.deleteOne({_id:req.params.id})

    res.redirect("/?page="+page+"&&sortedDate="+sortedDate);

}

module.exports = deleteTodoItem;