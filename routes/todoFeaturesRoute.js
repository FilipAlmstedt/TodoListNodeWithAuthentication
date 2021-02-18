const express = require("express");

//add Controllers
const showTodoList = require("../controller/todoFeatures/showTodoController");
const addTodoItem = require("../controller/todoFeatures/addTodoController");
const {renderEditTodoItem,editTodoItem} = require("../controller/todoFeatures/editTodoController");
const deleteTodoItem = require("../controller/todoFeatures/deleteTodoController");

//add middleware 
const verifyUser = require("../middleware/verifyUser");

const todoFeaturesRoute = express.Router();

//show the todo-list
todoFeaturesRoute.get("/", verifyUser, showTodoList);
//post request to add item to DB 
todoFeaturesRoute.post("/", verifyUser, addTodoItem)
//get request to find specific item to update
todoFeaturesRoute.get("/edit/:id", verifyUser, renderEditTodoItem);
//Post request to then update that item in the list
todoFeaturesRoute.post("/edit", verifyUser, editTodoItem);
//Get request to delete specific item
todoFeaturesRoute.get("/delete/:id", verifyUser, deleteTodoItem);

module.exports = todoFeaturesRoute;