import { ServerMiddleware } from "@nuxt/types";

const myServerMiddleware: ServerMiddleware = function (req, res, next) {
    // Use req, res, next

    //   // req is the Node.js http request object
    if (req.url === "/weather-api/?q=Aachen") {
        req.url = `${req.url}&appid=${process.env.API_KEY}`;
        console.log(req.url);
    }

    // next is a function to call to invoke the next middleware
    // Don't forget to call next at the end if your middleware is not an endpoint!
    next();
};

export default myServerMiddleware;
