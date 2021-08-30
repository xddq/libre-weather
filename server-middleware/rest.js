import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.all("/getJSON", async (req, res) => {
    // merges query into our api key. enables us to handle user specified api
    // key by overwriting the .env one
    const params = Object.assign({ appid: process.env.API_KEY }, req.query);
    console.log(params);
    const getParams = new URLSearchParams(params);
    console.log("params: ", getParams);

    // TODO(pierre): try adding headers?
    try {
        // forward modified request to weather api
        const { status, data } = await axios.get(
            `${process.env.API_URL}?${getParams}`
        );
        console.log("success!");
        res.status(status).send(data);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

export default app;
