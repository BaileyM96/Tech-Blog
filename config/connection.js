//Connect sequelizer and dotenv
const  Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;
//Checks the db to see if it exsists
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    //Check to see if the user name and password is setup
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3001
        }
    );
}

module.exports = sequelize;