const express = require("express");
const router = new express.Router();
const jsonschema = require("jsonschema");
const ExpressError = require("../expressError");
const User = require("../models/user");
const userSchema = require("../schemas/userSchema.json");


/** Get Route
 * 
 * fetches all users from the database
 * 
 */

router.get("/", async function (req, res, next) {
  try {
    const user = await User.getAll(req.query);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});


/** Get Route
 * 
 * fetches a user by username
 * 
 */

router.get("/:username", async function (req, res, next) {
  try {
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** Get Route
 * 
 * fetches a users balance based off their username
 * 
 */
router.get('/balance/:username', async (req, res, next) => {
  try {
    const user = await User.getBalance(req.params.username);
    return res.json({ user });
  } catch (error) {
    return next(error);
  }
});


/** Put Route
 * 
 * Updates a users balance based off of a bet
 * 
 */
router.put('/bet/:username', async (req, res, next) => {
  try {
    const user = await User.updateBalance(req.params.username, req.body);
    return res.json({ user });
  } catch (error) {
    return next(error);
  }
});


/** Put Route
 * 
 * Updates a user by username
 * 
 */

router.put("/:username", async function (req, res, next) {
  const result = jsonschema.validate(req.body, userSchema);

  if (!result.valid) {
    // pass validation errors to the error handler
    let listOfErrors = result.errors.map((error) => error.stack);
    let error = new ExpressError(listOfErrors, 400);
    return next(error);
  }
  try {
    const user = await User.update(req.params.username, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});


/** Delete Route
 * 
 * Deletes a user by ID
 * 
 */

router.delete("/:username", async function (req, res, next) {
  try {
    const user = await User.delete(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;