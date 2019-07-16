const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const sendPasswordResetEmail = require('../middleware/sendEmail');

const router = express.Router();


router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User Created Succefully. Please login.',
            result: result
          });
        }).catch(error =>
          res.status(500).json({
            message: 'Oops Error',
            error: error
          })
        )
    })
    .catch(
      error => {
        res.status(500).json({
          message: 'Oops Error',
          error: error
        })
      }
    );

});


router.post('/login', (req, res, next) => {
  let fetchedUser;
  User.findOne({
      email: req.body.email
    })
    .then(user => {
      if (!user) {
        fetchedUser = null;
        return res.status(401).json({
          message: 'Please Enter Valid Email ID and Password'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'Please Enter valid Email ID and Password.'
        });
      }
      if(fetchedUser != null) {
        const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, 'PROJECT_LOGIN', {expiresIn: '24h'});
      res.status(200).json({
        token: token,
        expiresIn: 86400,
        userId: fetchedUser._id
      });
      }
    })
    .catch(error => {
      console.log(error);
      return res.status(401).json({
        message: 'Auth Failed'
      });
    })
});

router.post('/changePassword', checkAuth, (req, res, next) => {
  const userId = req.userData.userId;
  bcrypt.hash(req.body.newPassword, 10)
    .then(hash => {
        console.log(hash);
        User.findByIdAndUpdate(userId, {
          password: hash
        }).then(
          response => {
            return res.status(200).json({
              message: 'Password Change Successfully. Please Login Again.',
              response: response
            });
          },
          error => {
            return res.status(400).json({
              message: 'Something Went Wrong. Please try again',
              error: error
            });
          });
      },
      error => {
        return res.status(400).json({
          message: 'Something Went Wrong. Please try again',
          error: error
        });
      }
    )
});

router.post('/forgotPassword', (req, res, next) => {
  let fetchedUser;
  console.log(req.body.emailAddress);
  User.findOne({
    email: req.body.emailAddress
  }).then(
    user => {
      if (!user) {
        return res.status(400).json({
          message: 'User Not Found. Please sign up.'
        });
      } else {
        fetchedUser = user;
        const randomString = Math.random().toString(36).substring(7);
        console.log(randomString);
        bcrypt.hash(randomString, 10).then(
          hash => {
            User.findByIdAndUpdate(fetchedUser._id, {
                password: hash
              }).then(
                response => {
                  const result = sendPasswordResetEmail(fetchedUser.email, randomString);
                      if(!result){
                        return res.status(400).json({message: 'Oops Error occured. Please try again.', response: response});
                      } else {
                        return res.status(200).json({message: 'Password Sent to Email ID.', response: response});
                      }
                },
                error => {
                  return res.status(400).json({
                    message: 'Oops Error occured. Please try again.',
                    error: error
                  });
                }
              ),
              error => {
                return res.status(400).json({
                  message: 'Oops Error occured. Please try again.',
                  error: error
                });
                //Wrong in Hasing
              }
          }, error => {
            return res.status(400).json({
              message: 'Oops Error occured. Please try again.',
              error: error
            });
            //Something Wrong Error.
          });
      }
    }, error => {
      return res.status(400).json({
        message: 'Oops Error occured. Please try again.',
        error: error
      });
      //Something Wrong Error.
    }
  );
});

module.exports = router;
