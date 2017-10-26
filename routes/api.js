const express = require('express');
const router = express.Router();

const Item = require('../models/Item');

router.get('/menu/:cat', (req, res) => {
  Item
    .find({category: req.params.cat, available: true})
    .then((doc) => {
      res.send(doc)
    })
});

module.exports = router;