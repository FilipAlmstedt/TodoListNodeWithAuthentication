# Todo-list with required authentication 
Using Express, MongoDB as the database through Mongoose with the addition that the user now needs an account to be able to use the app.
I also redesigned the app so it's looks and works a bit better than last time in my opinion

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
- User can now reset the password for his/her account via gmail

-----------------

### Getting Started

To install, clone project using `git clone` and open your terminal. To install all packages type `npm install` in the project folder and then use the command `npm start` to start and test the app.
Note that in order to use it you need a mongoose account to link your database with the project. 

You also have to create a `.env` and you need the following to make it work:
- URL to a datadase cluster via mongodb, you need an account, if you don't have an account get one at https://www.mongodb.com/cloud/atlas/lp/try2?utm_source=google&utm_campaign=gs_emea_sweden_search_core_brand_atlas_desktop&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624566&gclid=CjwKCAiAp4KCBhB6EiwAxRxbpOt5NtJ2jERom62EFi6wQF_r4ow0KCNEdzvhP6g27DEXiBuRj-Pp7xoCWboQAvD_BwE
- The port you want to use 
- A made up secret key to use for the jsonwebtoken
- An gmail address for an account to use for nodemailer
- The password for the gmail account you need to use for nodemailer

Now you're all set

Have fun!

OBS! App is not responsive! Made for laptop screens and bigger!