const express = require('express');

//ref for express router
const proRoute = express.Router();

let Pro = require('../model/product.model');

// first route
proRoute.route('/').get(function (req, res) {
  //res.render('index');
  Pro.find(function (err, data) {
    if (err) {
      console.log(err);
    }
    else {
      res.render('index', { products: data });
    }
  });
});

proRoute.route('/create').get(function (req, res) {
  res.render('create');
});

proRoute.route('/edit/:id').get(function (req, res) {
  res.render('edit');
});

proRoute.route('/add').post(function (req, res) {
  let data = new Pro(req.body);
  console.log(data);

  data
    .save()
    .then(emp => {
      res.redirect('/');
    })
    .catch(err => {
      res.status(400).send('Unable to save value into database');
    });
});

module.exports = proRoute;