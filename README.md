# Todo-list with required authentication 
Using Express, MongoDB as the database through Mongoose with the addition that the user now needs an account to be able to use the app.

Was made as second assignment for the class in 'Dynamisk Webbutveckling'.

-----------------

### Features:

###### The feature for the last Todo-list is the same:

- User can add a task
- User can edit a task
- User can delete a task
- The task will be automatically delete itself when the deadline date is todays date
- User can sort in ascending and descending order by the deadline date
- Pagination is used so the user and flick between pages. 3 task are shown per page

###### New features for the second assignment:

- User needs to create an account to use the Todo-list 
- User can now reset the password for his/her account via mail

-----------------

### Getting Started

To install, clone project using `git clone` and open your terminal. To install all packages type `npm install` and then use the command `npm start` to start and test the app.
Note that in order to use it you need a mongoose account to link your database with the project. Create a `.env` and copy your database url and the port you want to use and you are 
all set!

Have fun!

OBS! App is not responsive! Made for laptop screens and bigger!