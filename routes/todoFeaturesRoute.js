const express = require("express");
const Todo = require("../model/todo");

//add Controllers
const showTodoList = require("../controller/todoFeatures/showTodoController");
const addTodoItem = require("../controller/todoFeatures/addTodoController");
const {renderEditTodoItem,editTodoItem} = require("../controller/todoFeatures/editTodoController");
const deleteTodoItem = require("../controller/todoFeatures/deleteTodoController");

const todoFeaturesRoute = express.Router();

//show the todo-list
todoFeaturesRoute.get("/", showTodoList);

//post request to add item to DB 
todoFeaturesRoute.post("/", addTodoItem)

//get request to find specific item to update
todoFeaturesRoute.get("/edit/:id", renderEditTodoItem);

//Post request to then update that item in the list
todoFeaturesRoute.post("/edit", editTodoItem);

//Get request to delete specific item
todoFeaturesRoute.get("/delete/:id", deleteTodoItem);

module.exports = todoFeaturesRoute;