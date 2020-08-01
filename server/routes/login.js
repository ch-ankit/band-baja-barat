const router = require('express').Router();
const loginController = require('../controller/loginController');
//For Login
router.route('/user').get(loginController.user);

module.exports = router;
