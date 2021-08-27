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
import axios from "axios";

const app = express();

app.use(express.json());

app.all("/getJSON", async (req, res) => {
    // merges query into our api key enables us to handle user specified api key
    // by overwriting the .env one
    console.log(process.env.API_KEY);
    const params = Object.assign({ appid: process.env.API_KEY }, req.query);
    console.log(params);
    try {
        // forward modified request to weather api
        const { status, data } = await axios.get(process.env.API_URL, {
            params,
        });
        res.status(status).send(data);
    } catch (e) {
        res.status(500).send(e);
    }
});

export default app;
