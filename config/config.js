//For sensitive information to be secret
require("dotenv").config();

const database = process.env.DATABASE_URL;
const databasePort = process.env.PORT;
const secretKey = process.env.SECRET_KEY;
const nodeMailerUser = process.env.NODEMAILER_USERMAIL;
const nodeMailerPassword = process.env.NODEMAILER_PASSWORD;

module.exports = {
    database,
    databasePort,
    secretKey,
    nodeMailerUser,
    nodeMailerPassword
}