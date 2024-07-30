const Router = require('express');
const auth = require('../../middleware/Auth.middleware.js')
const {
     registration,
     login,
     logOut 
    } = require('../../controllers/voter.controller');
const router = Router();


router.route("/registration").post(registration);
router.route('/login').post(login)

// secured routes....
router.route("/logOut").post(auth,logOut)


module.exports = router