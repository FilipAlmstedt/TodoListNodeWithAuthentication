const Todo = require("../../model/todo");

let errors = [];

const addTodoItem = async (req,res) => {
    const {description,priority,deadlineDate,sortedDate, page} = req.body;

    let totalTodos;
    let date = new Date();

    const todoCount = await Todo.find({user: req.user.user._id}).countDocuments();
    const showDataPerClick = 3;
    
    totalTodos = todoCount;

    const data = await Todo.find({user: req.user.user._id}).skip((page-1)*showDataPerClick).limit(showDataPerClick).sort({deadlineDate: sortedDate}); 


    //Clear error messages from previous 
    errors = [];

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

    try {
        const newTask = await new Todo({
            description: description,
            priority: priority,
            deadlineDate: deadlineDate,
        }).save();
    
        newTask.addUser(req.user.user._id); 

        res.redirect("/?page="+page+"&&sortedDate="+sortedDate);

    }
    catch (err) {
        res.render("index.ejs", {
            errors,
            currentPage: parseInt(page,10),
            user: req.user.user.name,
            data: data, 
            totalTodos,
            hasNextPage: totalTodos > showDataPerClick*page,
            hasPreviousPage: page>1,
            nextPage: page+1,
            previousPage: page-1,
            lastPage: Math.ceil(totalTodos/showDataPerClick),
            date,
            sortedDate,
            length: data.length,
        })
    }   
}

module.exports = addTodoItem;