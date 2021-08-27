// const express = require("express");
// const app = express();
//
// app.use(express.json());
// app.all("/api", (req, res) => {
//     res.json({ data: "data" });
// });
//
// module.exports = app;

// did not work?
import express from "express";

console.log("hello from ts !");

const app = express();

app.use(express.json());

app.all("/getJSON", (req, res) => {
    // res.json({ data: "data" });
    res.status(200).send("getJSON! :)");
});

app.use((req, res, next) => res.status(200).send("hello"));

export default app;
