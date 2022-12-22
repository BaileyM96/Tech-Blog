const seed = require('./seed');
const postSeeds = require('./post-seeds');
const commentsSeeds = require('./comments-seeds');

const sequelize = require('../config/connection');

const seedAll = async() => {
    //Create and sync all models
    await sequelize.sync({ force: true });
    await commentsSeeds();
    await postSeeds();
    await seed();
};

seedAll();