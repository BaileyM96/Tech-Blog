const  router = require('express').Router();
// Require Auth for the sign up page 
const withAuth = require('../utils/auth');
const { User, Post, Comments } = require('../models');


//render the homepage
router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: {exclude: ['password']},
            order: [['name', 'ASC']],
            // Create a function to prevent a non logged in user from viewing the page
        });

        const users = userData.map((project) => project.get({ plain: true }));

        res.render('homepage', {posts, logged_in: req.session.logged_in});
    } catch (err) {
        res.status(500),json(err);
    }
});
//redirect to mainpage
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});
//signup route
router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'content',
            'title',
            'created_at'
        ],
        include: [{
            model: 'Comments',
            attributes:['id', 'comment', 'user_id', 'post_id'],
            include: {
                model: User,
                attributes: ['Username']
            }
        },
        {
            model: User,
            attributes: ['Username']
        }
    ]
    })
})

//Create a new comment
router.post('post/:id/Comments', async (req, res) => {
    try {
        const newComment = await Comments.create({
            Comment: req.body.Comment,
            user_id: req.body.user_id,
            post_id: req.params.id
        });
        res.status(201).json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get a specific comment
router.get('/Comments/:id', async (req, res) => {
    try{
        const comments = await Comments.findAll({
            where: {
                post_id: req.params.id
            },
            include: {
                model: User, attributes: ['username']
            }
        });
        res.json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
}),
//get a specific comment by id

//Update the a specific comment by Id

//Allow the route to delete a comment

module.exports = router;