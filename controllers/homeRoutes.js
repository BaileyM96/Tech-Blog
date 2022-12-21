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
//router.get('/login)
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
})

module.exports = router;