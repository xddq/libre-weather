export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: "homepage",
        htmlAttrs: {
            lang: "en",
        },
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            { hid: "description", name: "description", content: "" },
            { name: "format-detection", content: "telephone=no" },
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
    // config that is only available in the server side.
    privateRuntimeConfig: {
        API_KEY: process.env.API_KEY,
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Will be called on every server request. src: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-servermiddleware
    // typescript: https://typescript.nuxtjs.org/cookbook/server-middlewares/
    serverMiddleware: ["~/server-middleware/logger"],

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        "@nuxt/typescript-build",
        // https://go.nuxtjs.dev/tailwindcss
        "@nuxtjs/tailwindcss",
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: ["@nuxtjs/axios"],

    axios: {
        proxy: true, // Can be also an object with default options
    },

    proxy: {
        "/weather-api/": `https://api.openweathermap.org/data/2.5/weather?q=Aachen&appid=${process.env.API_KEY}&q=Mexico`,
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
};
