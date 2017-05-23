var express = require("express");

var router = express.Router();
var burger = require("../models/burger");
var db = require("../models")

// get route -> index
router.get("/", function(req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function(req, res) {
  // express callback response by calling burger.selectAllBurger
  db.Burger.findAll().then(function(burger){
    console.log("I am here")
    hbsObject = {burgers: burger};
    console.log(hbsObject);
    res.render('index', hbsObject)
    
  });
});

// post route -> back to index
router.post("/burgers/create", function(req, res) {
  // takes the request object using it as input for buger.addBurger
  
    var burger = req.body;
   console.log(burger); 

    db.Burger.create({ 
       Name:burger.burger_name, 
      devoured:false  }).then(function()
           {res.redirect('/');   })
    
    
  });

// router.delete("/api/burgers/:id", function(req, res) {
//     db.Author.destroy({
//       where: {
//         id: req.params.id
//       }
//     }).then(function() {
//       res.json();
//     });
//   });


// put route -> back to index
router.put("/:id", function(req, res) {
  db.Burger.update({
    devoured: true,
  },
  {
    where:{
      id : req.params.id
    }
  }).then(function(dbBurger){
    res.redirect("/");
  });;
    // wrapper for orm.js that using MySQL update callback will return a log to console,
    // render back to index with handle
   
    
  });
};

module.exports = router;
