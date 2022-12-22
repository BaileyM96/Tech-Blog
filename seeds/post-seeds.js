const { Post } = require('../models/Post');

const postData = [
    {
        post_title: 'Coding is great!',
        body: 'jhkjdfhahkdsa',
        userId: 1
    },
    {
        post_title: 'How to get good at writing code.',
        body: 'Study a lot and read the documentation',
        userId: 2
    }

];

const seededPosts = () => Post.bulkCreate(postData);

module.exports = seededPosts;