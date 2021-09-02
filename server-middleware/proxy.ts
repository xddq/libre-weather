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
        return res.status(401).json({
            message:
                "You did not set up an api key in your server or in your frontend!",
        });
    }
    // makes sure we have the api url set
    if (process.env.API_URL === undefined || process.env.API_URL === null) {
        return res.status(500).json({
            message: "Can't proxy request because API_URL was not set!",
        });
    }

    // allows overwriting default api key with a user specified one.
    const queryParams = Object.assign(
        { appid: process.env.API_KEY },
        req.query
    );

    try {
        // forward modified request to weather api
        const { status, data } = await axios.get(process.env.API_URL, {
            params: queryParams,
        });
        return res.status(status).send(data);
    } catch (e) {
        return res.status(500).send(e);
    }
});

export default app;
