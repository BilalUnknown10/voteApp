const Router = require('express');
const { registration } = require('../../controllers/voter.controller');
const router = Router();


router.route("/registration").get(registration)


module.exports = router