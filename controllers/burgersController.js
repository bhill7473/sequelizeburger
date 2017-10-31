var express = require('express');
var router = express.Router();
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var burger = require('../models')['Burger'];

router.get('/', function(req, res) {
    res.redirect('/Burger')
});


router.get('/Burger', function(req, res) {
    burger.findAll({}).then(function(data) {
        var hbsObject = { burgers: data }
        console.log(hbsObject);
        res.render('index', hbsObject);
    });
});

router.post('/Burger/create', function(req, res) {
   burger.create({
    burger_name: req.body.burger_name
  })
  .then(function(burger) {

    console.log(burger);
    res.redirect("/Burger");
  });
});

router.put('/Burger/update/:id', function(req, res) {
    burger.update({ devoured: req.body.devoured }, {
        fields: ['devoured'],
        where: { id: req.params.id }
    }).then(function(burger) {
      console.log(burger);
      res.redirect('/Burger')
    });
});

module.exports = router;