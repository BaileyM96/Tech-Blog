//require router
const router = require('express').Router();
const { User, Post, Comments } = require('../../models');

//Need to be able to create a new user and then log them in
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user.id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

//Validate the user to make sure they have an username and a vailid password when they try to login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({where: { email: req.body.email } });
        if (!userData){
            res
            .status(400)
            .json({ message: 'Incorrect email or password please try again.'});
            return;
        }
            //Need an error message if the password is incorrect or not exsists
        const validatePassword = await userData.checkPassword(req.body.password);

        if (!validatePassword){
            res
            .status(400)
            .json({ message: 'Incorrect email or password please try again.'});
            return;
        }

        //Create a session that is saved and shows that you are logged in and gives you a message
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

//TODO create a logout end point
router.post('logout', (req, res) => {
    //Make sure the user is logged in to be able to sign out
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        //Send an error code if user is not logged in
        res.status(404).end();
    }
});


module.exports = router;