"use strict";

const { response } = require("express");
// Boilerplate
const express = require("express");

const db = require("../fakeDb");
const router = new express.Router();
//End of Boilerplate

/** GET /items: returns list of shopping items */
router.get("/", function (req, res) {
  return res.json(db.items);
});

/** POST /items: accept JSON body, add item, return the new item */
router.post("/", function (req, res) {
  db.items.push(req.body);
  return res.json({ added: req.body });
});

/** GET /items/:name: returns a single item from the database.*/
router.get("/:name", function (req, res) {
  let result = findItem(db.items, req.params.name);
  // debugger;
  return res.json(result);
});

/** Function which accepts array of items in database. Iterates through array
 *  of objects to find the matching keyword. Returns the object of interest.
 */
function findItem(items, keyword) {
  for (let obj of items) {
    if (obj["name"] === keyword) {
      return obj;
    }
  }
}

/** PATCH /items: accept JSON body, modify item and return it */
router.patch("/:name", function (req, res) {
  let result = findItem(db.items, req.params.name);
  result.name = req.body.name;
  db.items.push(req.body);
  return res.json({ updated: req.body });
});


/** DELETE /:name delete item, return {message: Deleted} */
router.delete("/:name", function (req, res) {
    deleteItem(req.params.name);
    return res.json({ message: "Deleted" });
  });

/** Function which finds index of desired item in array of objects and
 *  removes it from the array using splice. Returns remaining objects in array.
*/

function deleteItem(item) {
    let itemIdx = db.items.indexOf(item)
    db.items.splice(itemIdx, 1)
    return db.items
}


//End Boilerplate
module.exports = router;
// End of End Boilerplate
