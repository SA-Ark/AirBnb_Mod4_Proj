// backend/routes/api/users.js
const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();
// backend/routes/api/users.js
// ...
// backend/routes/api/users.js
// ...
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('firstName')
    .exists({checkFalsy: true})
    .isLength({min: 2})
    .withMessage('Please provide a first name with atleast 2 characters.'),
  check('lastName')
    .exists({checkFalsy: true})
    .isLength({min: 2})
    .withMessage('Please provide a last name with atleast 2 characters.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];
// Sign up


  // backend/routes/api/users.js
// ...

// Sign up

router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;
    const user = await User.signup({ email, username, password, firstName, lastName });
    const token = setTokenCookie(res, user);
    userPOJO = user.toJSON()
    userPOJO.token = token
    delete userPOJO.createdAt;
    delete userPOJO.updatedAt

    return res.json(
      // user: user,
      userPOJO
    );
  }
);

module.exports = router;
