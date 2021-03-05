const express = require("express");

//add Controllers
const showTodoList = require("../controller/todoFeatures/showTodoController");
const addTodoItem = require("../controller/todoFeatures/addTodoController");
const {renderEditTodoItem,editTodoItem} = require("../controller/todoFeatures/editTodoController");
const deleteTodoItem = require("../controller/todoFeatures/deleteTodoController");

//add middleware 
const verifyUser = require("../middleware/verifyUser");

const router = express.Router();

//show the todo-list
router.get("/", verifyUser, showTodoList);
//post request to add item to DB 
router.post("/", verifyUser, addTodoItem)
//get request to find specific item to update
router.get("/edit/:id", verifyUser, renderEditTodoItem);
//Post request to then update that item in the list
router.post("/edit", verifyUser, editTodoItem);
//Get request to delete specific item
router.get("/delete/:id", verifyUser, deleteTodoItem);

//When user click on the log out link, cookies with token is cleared.
router.get("/logout", (req, res) => {
    res.clearCookie("jwtToken").redirect("/login");
})


module.exports = router;