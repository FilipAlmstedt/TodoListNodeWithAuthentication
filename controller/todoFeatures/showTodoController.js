const Todo = require("../../model/todo");

const showTodoList = async (req,res) => {
    const page = +req.query.page || 1;
    const sortedDate = +req.query.sortedDate || 1;
    
    let date = new Date();
    let totalTodos;

    try {

        //Pagination with page links 
        const todoCount = await Todo.find().countDocuments();
        const showDataPerClick = 3;
        totalTodos = todoCount;

        const data = await Todo.find().skip((page-1)*showDataPerClick).limit(showDataPerClick).sort({deadlineDate: sortedDate});

        res.render("index.ejs", {
            data: data, 
            error: "emptyString",
            totalTodos,
            hasNextPage: totalTodos > showDataPerClick*page,
            hasPreviousPage: page>1,
            nextPage: page+1,
            previousPage: page-1,
            currentPage: page,
            lastPage: Math.ceil(totalTodos/showDataPerClick),
            date,
            sortedDate
            })
    } catch(err){
        res.render("error.ejs", {error: err})
    }

}

module.exports = showTodoList;
