//require User
const User = require('./User');
const Post = require('./Post');
const Comments = require('./Comments');

// Need hasMany to connect the id to multiple tables
User.hasMany(Comments, {
    foreignKey: 'id'
});

Post.belongsTo(User, {
    foreignKey: 'id'
});

User.hasMany(Post, {
    foreignKey: 'id'
});

Comments.belongsTo(User, {
    foreignKey: 'id'
});

Comments.belongsTo(Post, {
    foreignKey: 'id'
});

Post.hasMany(Comments, {
    foreignKey: 'id'
});

module.exports = { User, Post, Comments };