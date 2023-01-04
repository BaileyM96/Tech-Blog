const { User } = require('../models');

const userData = [
    {
        username: 'root',
        password: 'password'
    },

];

const seededUser = () => User.bulkCreate(userData);

module.exports = seededUser;