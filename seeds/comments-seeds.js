const { Comments } = require('../models');

const commentData = [
    {
        comment: 'blah blah blah',
        userId: 1,
        postId: 1
    },
    {
        comment: 'I love to code a lot',
        userId: 2,
        postId: 2
    }    

];

const seededComments = () => Comments.bulkCreate(commentData);

module.exports = seededComments;