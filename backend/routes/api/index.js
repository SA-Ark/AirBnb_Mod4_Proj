// backend/routes/api/index.js
const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');
router.use(restoreUser);
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js');
const bookingsRouter = require('./bookings.js');
const spotImagesRouter = require('./spotImages.js');
const reviewImagesRouter = require('./reviewImages.js');


router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

router.use('/reviews', reviewsRouter);

router.use('/bookings', bookingsRouter);

router.use('/spot-images', spotImagesRouter);

router.use('/review-images', reviewImagesRouter);



router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

router.get('/test', (req, res) => {
  res.json('YAYA ITS WORKING');
});



/// backend/routes/api/index.js
// ...

// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
//   });

//   // ...

// // backend/routes/api/index.js
// // ...

// // GET /api/set-token-cookie
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });

// // ...
// // GET /api/restore-user


// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );


// // GET /api/require-auth
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// ...

module.exports = router;
