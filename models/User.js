const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(loginPass) {
        return bcrypt.compareSync(loginPass, this.Password);
    }
}
//Define tables and configuration
User.init(
    {
        //Define ID 
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true,
        },
        //Define username
        Username: {
            type: Datatypes.STRING(30),
            allowNull: false,
            unique: true
        },
        //Define Password
        Password: {
            type: Datatypes.STRING,
            allowNull: false,
            // Validates if the password is at least 14 characters long
            validate: {
                len: [14],
            },
        },
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.Password= await bcrypt.hash(newUserData.Password, 10);
                return newUserData;
            },
        },
        sequelize, 
        timestamps:false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;
