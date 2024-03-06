const express = require("express");
const router = new express.Router();
const jsonschema = require("jsonschema");
const ExpressError = require("../expressError");
const Trivia = require("../models/trivia");
const triviaSchema = require("../schemas/triviaSchema.json");


/** Gets list of 10 trivia questions*/

router.get("/", async function (req, res, next) {
  try {
    const trivia = await Trivia.getTen(req.query);
    return res.json({ trivia });
  } catch (err) {
    return next(err);
  }
});










module.exports = router;