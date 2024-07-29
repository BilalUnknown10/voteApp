const Router = require('express');
const { registration, login } = require('../../controllers/voter.controller');
const router = Router();


router.route("/registration").post(registration);
router.route('/login').post(login)


module.exports = router