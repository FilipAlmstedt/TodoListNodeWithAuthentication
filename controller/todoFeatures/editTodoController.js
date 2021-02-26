const Todo = require("../../model/todo");

let errors = [];

const renderEditTodoItem = async (req,res) => {

    const {sortedDate, page} = req.query;
    const data = await Todo.find();
    const chosenItem = await Todo.findOne({_id:req.params.id}); 
    res.render("editItem.ejs", {chosenItem: chosenItem, data: data,sortedDate, page, errors})
    
}

const editTodoItem = async (req,res) => {

    errors = [];

    const {sortedDate, page, id, description, priority, deadlineDate} = req.body;
   
    //error control
    if(!description) {
        errors.push(" Task description is required!");
    }
    if(!priority) {
        errors.push(" Priority is required! Please type in high or low as a task!");
    }
    if(!deadlineDate){
        errors.push(" Date is required!");
    }  

    if(!description || !deadlineDate || !priority) { 
        return res.redirect("edit/"+id+"?page="+page+"&sortedDate="+sortedDate);
    }
    
    await Todo.updateOne(
        {_id: id}, 
        {description: description,
        priority: priority,
        deadlineDate: deadlineDate},
    )
    return res.redirect("/?page="+page+"&&sortedDate="+sortedDate);         
    
}

module.exports = {editTodoItem,renderEditTodoItem};