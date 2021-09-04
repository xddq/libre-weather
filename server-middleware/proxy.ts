import express from "express";
import axios from "axios";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { GeolocationResponse } from "~/types/Weather";

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
    // makes sure we have input for our api call
    if (req?.query?.q === undefined) {
        return res.status(401).json({
            message: "You need to pass a city and a country! e.g. 'Berlin, de'",
        });
    }

    // makes sure we have an api key set in client or server
    if (req.query.apiKey === null && process.env.API_KEY === null) {
        return res.status(401).json({
            message:
                "You did not set up an api key in your server or in your frontend!",
        });
    }

    // makes sure we have the api urls set
    if (
        process.env.API_GEOLOCATION_URL === undefined ||
        process.env.API_ONE_CALL_URL === undefined
    ) {
        return res.status(500).json({
            message: "Can't proxy request because api urls were not set!",
        });
    }

    // prefers user specified api key, if available
    const apiKey =
        req?.query?.appid === undefined ? process.env.API_KEY : req.query.appid;

    // query lat long, and then weather data for given city
    try {
        // gets geodata by city and state
        const geoQueryParams = Object.assign({ appid: apiKey }, req?.query);
        const geoResult = await axios.get(process.env.API_GEOLOCATION_URL, {
            params: geoQueryParams,
        });

        // gets all weather data for given lat long
        const geoData: GeolocationResponse = geoResult.data;

        // makes sure we got results
        if (!Array.isArray(geoData)) {
            throw new TypeError(
                "Unexpected api response. Resulting data is not an array."
            );
        }

        // picks first result as best match
        // TODO(pierre): get units from settins.
        const weatherQueryParams = {
            appid: apiKey,
            lat: geoData[0].lat,
            lon: geoData[0].lon,
            units: "metric",
        };
        const weatherResult = await axios.get(process.env.API_ONE_CALL_URL, {
            params: weatherQueryParams,
        });

        if (!(typeof req.query.q === "string")) {
            throw new TypeError(
                `Unexpected query type. Should be string but was: ${typeof req
                    .query.q}`
            );
        }
        // what is passed for non us weather data calls
        // city, country
        // what is passed for us weather data calls
        // city, state, country
        // src: https://openweathermap.org/api/geocoding-api#direct_name
        const locationParams: string[] = req.query.q
            .split(",")
            .map((location) => location.trim());
        switch (locationParams.length) {
            case 2:
                weatherResult.data.city = locationParams[0];
                weatherResult.data.country = locationParams[1];
                break;
            case 3:
                weatherResult.data.city = locationParams[0];
                weatherResult.data.state = locationParams[1];
                weatherResult.data.country = locationParams[2];
                break;
            default:
                throw new Error(
                    `Unexpected amount of locationParams! Amount: ${locationParams.length}`
                );
        }

        return res.status(200).send(weatherResult.data);
    } catch (e) {
        return res.status(500).send("Proxying requests did throw an error.");
    }
});

export default app;
