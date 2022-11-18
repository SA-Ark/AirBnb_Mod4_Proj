// backend/routes/api/session.js
const express = require('express')
// backend/routes/api/session.js


const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();


// backend/routes/api/session.js
// ...

// Log in
// backend/routes/api/session.js
// ...

// Restore session user
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({ user: null });
  }
);


// ...

router.post(
  '/',
  async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({
      user: user
    });
  }
);




module.exports = router;
