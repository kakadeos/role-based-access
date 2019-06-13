const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

router.get('/admin',checkAuth,(req, res, next) => {
  res.status(200).json('You are admin');
});

router.get('/client',checkAuth,(req, res, next) => {
  res.status(200).json('You are client');
});

module.exports = router;
