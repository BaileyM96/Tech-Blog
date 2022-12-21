const router = require('express').Router();
const apiRoutes = require('../controllers/api/userRoutes');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/', apiRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;