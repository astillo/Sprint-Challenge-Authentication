const axios = require('axios');

const router = require('express').Router();

const rest = require('../auth/authenticate-middleware')



router.get('/', rest, (req, res) => {
  const token = req.headers.authorization
  const requestOptions = {
    headers: { accept: 'application/json' },
    authorization: token
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
});

module.exports = router;
