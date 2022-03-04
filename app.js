'use strict';

const express = require('express');
const app = express();
const fs = require('fs').promises;

const FILE_ERROR = 500;
const PARAM_ERROR = 400;

app.get("/foods", async function(req, res) {
  try {
    let tubers = await fs.readFile("tuber.txt", "utf8");
    res.type("text");
    res.send(tubers);
  } catch (err) {
    res.type("text");
    res.status(FILE_ERROR).send("Could not retrieve tubers");
  }
});

app.get("/streamer", async function(req, res) {
  try {
    let tubers = await fs.readFile("vtuber.txt", "utf8");
    res.type("text");
    res.send(tubers);
  } catch (err) {
    res.type("text");
    res.status(FILE_ERROR).send("Could not retrieve information");
  }
});

app.get('/tuber/:name', async function(req, res) {
  if (!req.params.name) {
    res.type("text");
    res.status(PARAM_ERROR).send("Missing Name Parameter");
  }
  let tuberName = req.params.name;
  try {
    let tuberInfo = await fs.readFile(tuberName + ".json", "utf8");
    res.type("json");
    res.send(JSON.parse(tuberInfo));
  } catch (err) {
    res.type("text");
    res.status(FILE_ERROR).send("Could not get information for " + tuberName);
  }
});

app.use(express.static('public'));
const PORT = process.env.PORT || 8000;
app.listen(PORT);