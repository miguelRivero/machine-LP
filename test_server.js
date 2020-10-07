const express = require("express");
var cors = require("cors");
const app = require("https-localhost")();
app.use(cors());
app.use(express.json());
// app is an express app, do what you usually do with express
app.use(express.static("public"));
app.listen(8080);
