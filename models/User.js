const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');



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
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true,
        },
        //Define username
        Username: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
        },
        email: {
            type:DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        //Define Password
        Password: {
            type: DataTypes.STRING,
            allowNull: false,
            // Validates if the password is at least 14 characters long
            validate: {
                min: [14],
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
