const router = require('express').Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Users = require('./user-model')
const secrets = require('../config/secrets')

const session = require('express-session')

const sessionConfig = {
  name: 'cookie',
  secret: 'this is my little secret!',
  cookie: {
    maxAge: 10000 * 33000,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false,
}

router.use(session(sessionConfig))

router.post('/register', (req, res) => {
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 10)
  user.password = hash
  Users.add(user)
    .then(user => {
      res.status(201).json({ user })
    })
    .catch(err => {
      res.status(500).json({ err })
    })
});

router.post('/login', (req, res) => {
  let { username, password } = req.body
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)
        req.session.user = user
        res.status(200).json({ token })
      }
      else {
        res.status(401).json({ message: "invalid credentials" })
      }
    })
    .catch(err => {
      res.status(500).json({ err })
    })
});

function generateToken(user) {
  const payload = {
    username: user.username,
  }
  const options = {
    expiresIn: '3d',
  }
  return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;
