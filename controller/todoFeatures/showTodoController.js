const Todo = require("../../model/todo");
let errors = [];

const showTodoList = async (req,res) => {
    const page = +req.query.page || 1;
    const sortedDate = +req.query.sortedDate || 1;

    let date = new Date();
    let totalTodos;

    try {

        //Pagination with page links 
        const todoCount = await Todo.find({user: req.user.user._id}).countDocuments();
        const showDataPerClick = 3;
        totalTodos = todoCount;

        //Variables needed for calculating time left to deadline
        let oneWeek = 1000*60*60*24*7;
        let year = 1000*60*60*24*7*52;
        let days = 1000*60*60*24;

        const data = await Todo.find({user: req.user.user._id}).skip((page-1)*showDataPerClick).limit(showDataPerClick).sort({deadlineDate: sortedDate}); 

        res.render("index.ejs", {
            data: data, 
            totalTodos,
            hasNextPage: totalTodos > showDataPerClick*page,
            hasPreviousPage: page>1,
            nextPage: page+1,
            previousPage: page-1,
            currentPage: page,
            lastPage: Math.ceil(totalTodos/showDataPerClick),
            date,
            sortedDate,
            user: req.user.user.name,
            length: data.length,
            errors,
            oneWeek,
            year,
            days
            })
    } catch(err){
        res.render("index.ejs", {
            errors,
        })
    }

}

module.exports = showTodoList;
