const router = require('express').Router();
const loginController = require('../controller/loginController');
//For Login
router.route('/user').post(loginController.user);
router.route('/host').post(loginController.host);
router.route('/admin').post(loginController.admin);

module.exports = router;
