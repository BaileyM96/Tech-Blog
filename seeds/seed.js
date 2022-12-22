const { User } = require('../models');

const userData = [
    {
        username: 'Hawk85',
        password: 'Hawk'
    },
    {
        username: 'Rinzler',
        password: 'daftpunk'
    }    

];

const seededUser = () => User.bulkCreate(userData);

module.exports = seededUser;