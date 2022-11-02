"use strict";

const { response } = require("express");
// Boilerplate
const express = require("express");

const db = require("../fakeDb");
const router = new express.Router();
//End of Boilerplate

/** GET /items: returns list of shopping items */
router.get("/", function(req, res){
    return res.json(db.items);
})

/** POST /items: accept JSON body, add item, return the new item */
router.post("/", function(req, res){
    db.items.push(req.body);
    return res.json({added : req.body});
})

//End Boilerplate
module.exports = router;
// End of End Boilerplate