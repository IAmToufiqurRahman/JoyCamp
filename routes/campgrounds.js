const express = require('express')
const router = express.Router()
const catchAsync = require('../utility/catchAsync')
const campgrounds = require('../controllers/campgrounds')
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware')

const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })

router
  .route('/')
  .get(catchAsync(campgrounds.index))
  .post(
    isLoggedIn,
    upload.array('campground[image]'),
    validateCampground,
    catchAsync(campgrounds.createCampground)
  )
// .post(upload.array('campground[image]'), (req, res) => {
//   res.send(req.body, req.files)
// })
router.get('/new', isLoggedIn, campgrounds.newCamp)

router
  .route('/:id')
  .get(catchAsync(campgrounds.showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array('campground[image]'),
    validateCampground,
    catchAsync(campgrounds.updateCampground)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

router.get(
  '/:id/edit',
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.editCampground)
)

module.exports = router
