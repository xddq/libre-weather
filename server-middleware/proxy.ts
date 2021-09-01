import express from "express";
import axios from "axios";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

const app = express();
// avoids cors by setting allow origin *
app.use(cors());
// enables parsing requests with json payloads
app.use(express.json());
// enables logging incoming requests
app.use(morgan("combined"));
// enables adapting security relevant headers for our response
app.use(helmet());

app.all("/weather", async (req, res) => {
    // makes sure we have an api key set in client or server
    if (req.query.apiKey === null && process.env.API_KEY === null) {
        res.status(401).json({
            message:
                "You did not set up an api key in your server or in your frontend!",
        });
    }

    // build query params for get request

    try {
        // forward modified request to weather api
        const { status, data } = await axios.get("test");
        console.log("success!");
        res.status(status).send(data);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

export default app;
