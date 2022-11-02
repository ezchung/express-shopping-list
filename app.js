"use strict";
const express = require("express");
const app = express();
const itemsRouter = require("./routing/itemsRouter");
const { NotFoundError } = require("./expressError");

app.use(express.json()); // process JSON data
app.use(express.urlencoded()); // process trad form data

app.use("/items", itemsRouter);

// ... your routes go here ...


app.use(function (req, res) { // handle site-wide 404s. If user goes to a route that does not exist, invoke this function. 
  throw new NotFoundError();
});

app.use(function (err, req, res, next) { // global err handler
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});

module.exports = app; // don't forget this!