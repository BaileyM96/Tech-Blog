
const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        postTitle: {
            type:Datatypes.STRING,
            allowNull: false
        },
        body: {
            type:Datatypes.STRING,
            allowNull: false
        },
        //reference the user Id in the user file of models
        user: {
            type: Datatypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }    

);

module.exports = Post;