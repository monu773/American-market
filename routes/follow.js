const express = require('express');
const router = express.Router();
const posts = require('../controllers/posts');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Campground = require('../models/campground');

router.route('/users/:userId/follow')
    .post(isLoggedIn)

router.route('/users/:userId/unfollow')
    .post(isLoggedIn)

router.get('/users/:userId/following', isLoggedIn)

router.get('/users/:userId/followers', isLoggedIn)



module.exports = router;