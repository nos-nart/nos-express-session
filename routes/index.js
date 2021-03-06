const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/user.controller');
const { protected } = require('../controllers/protected.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.route('/')
  .get((req, res) => {
    console.log('req: ', req.session);
    res.render('pages/index', { user: req.session.user || '' })
  })

router.route('/register')
  .get((req, res) => res.render('pages/register'))
  .post(register)

router.route('/login')
  .get((req, res) => res.render('pages/login'))
  .post(login)

router.route('/protected')
  .all(authenticate)
  .get((req, res) => res.render('pages/protected'))
  .get(protected)

router.route('/logout')
  .post(logout)

module.exports = router
