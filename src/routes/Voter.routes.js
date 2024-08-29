const {Router} = require('express');
const auth = require('../middleware/Auth.middleware.js')
require('dotenv').configDotenv()
const {
     registration,
     login,
     logOut, 
     votePole,
     checkUserLogin,
     voteCount,
     home
    } = require('../controllers/voter.controller.js');
const router = Router();


router.route("/registration").post(registration);
router.route('/login').post(login);
router.route('/count/:party').get(voteCount)
// secured routes....
router.route("/logOut").get(auth, logOut);
router.route("/polevote").post(auth, votePole),
router.route('/user').get(auth, checkUserLogin)


module.exports = router