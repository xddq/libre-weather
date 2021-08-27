import { ServerMiddleware } from "@nuxt/types";

const myServerMiddleware: ServerMiddleware = function (req, res, next) {
    const apiProxyRoute = "/weather-middleware/";
    const url: string = req.url ?? "";
    const matched = url.match("/weather-middleware/.*");

    if (matched !== null) {
        // gets the input city
        const city = url.substr(apiProxyRoute.length);
        // const params = new URLSearchParams({
        //     appid: process.env.API_KEY,
        //     q: city,
        // });

        console.log(axios);
        console.log(city, process.env.API_KEY);
        res.end("test");
        return;
    }
    console.log("no match");
    next();

    // req is the Node.js http request object
    // if (req.url === "/weather-api/?q=Aachen") {
    //     req.url = `${req.url}&appid=${process.env.API_KEY}`;
    //     console.log(req.url);
    // }
    //
    // // next is a function to call to invoke the next middleware
    // // Don't forget to call next at the end if your middleware is not an endpoint!
    // next();
};

export default myServerMiddleware;
