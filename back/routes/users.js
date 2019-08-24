var express = require("express");
var router = express.Router();
const User = require("../models/user");

/* GET users listing. */
router.get("/", async (req, res, next) => {
  User.find({})
    .then(data => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(data);
    })
    .catch(err => {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.json("error");

      console.log(err);
    });
});

router.post("/register", (req, res, next) => {
  let Account = new User();
  Account.name = req.body.name;

  Account.email = req.body.email;

  Account.save(err => {
    if (err) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.json("error");
      console.log(err);
      return;
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json("Account added");
    }
  });
});

router.post("/addMovie/:id", (req, res, next) => {
  let query = { _id: req.params.id };
  console.log(req.body);
  User.update(
    query,
    {
      $addToSet: {
        movies: req.body
      }
    },
    err => {
      if (err) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.json("error");
        console.log(err);
        return;
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json("movie added to list");
      }
    }
  );
});

router.post("/deleteMovie/:id", (req, res, next) => {
  let query = { _id: req.params.id };
  console.log(req.body);
  User.update(
    query,
    {
      $pull: {
        movies: req.body
      }
    },
    err => {
      if (err) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.json("error");
        console.log(err);
        return;
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json("movie removed");
      }
    }
  );
});

module.exports = router;
