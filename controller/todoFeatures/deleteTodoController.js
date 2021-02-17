const Todo = require("../../model/todo");


const deleteTodoItem = async (req,res) => {
    const theWholeTodoList = await Todo.find().countDocuments();
    const showDataPerClick = 3;
    const totalPages = Math.ceil(theWholeTodoList/showDataPerClick);

    await Todo.deleteOne({_id:req.params.id})
    res.redirect("/?page="+totalPages);

}

module.exports = deleteTodoItem;