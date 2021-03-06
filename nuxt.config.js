import path from "path";
import fs from "fs";

export default {
    // options for the server that will be hosted
    // https://nuxtjs.org/docs/configuration-glossary/configuration-server/#example-using-https-configuration
    server:
        process.env.NODE_ENV !== "production"
            ? {
                  // Setup in local dev. Gives us https in local dev server.
                  port: process.env.HOST_PORT ?? 3000,
                  host: process.env.HOST_ADDRESS ?? "localhost",
                  timing: false,
                  https: {
                      key: fs.readFileSync(
                          path.resolve(__dirname, "server.key")
                      ),
                      cert: fs.readFileSync(
                          path.resolve(__dirname, "server.crt")
                      ),
                  },
              }
            : {
                  // Setup in production. Here we get https from nginx proxy.
                  port: process.env.HOST_PORT ?? 3000,
                  host: process.env.HOST_ADDRESS ?? "localhost",
                  timing: false,
              },
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: "Libre Weather",
        htmlAttrs: {
            lang: "en",
        },
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            // most important meta tags
            {
                hid: "title",
                name: "title",
                content: process.env.META_TITLE ?? "Weather App",
            },
            {
                hid: "description",
                name: "description",
                content: process.env.META_DESCRIPTION ?? "Weather App",
            },
            // twitter specific meta tags
            {
                hid: "twitter:card",
                name: "twitter:card",
                content: "summary_large_image",
            },
            {
                hid: "twitter:url",
                name: "twitter:url",
                content: process.env.BASE_URL,
            },
            {
                hid: "twitter:title",
                name: "twitter:title",
                content: process.env.META_TITLE ?? "Weather App",
            },
            {
                hid: "twitter:description",
                name: "twitter:description",
                content: process.env.META_TITLE ?? "Weather App",
            },
            {
                hid: "twitter:image",
                name: "twitter:image",
                content: process.env.META_IMAGE,
            },
            // open graph (facebook) specific meta tags
            {
                hid: "og:type",
                name: "og:type",
                content: "website",
            },
            {
                hid: "og:url",
                name: "og:url",
                content: process.env.BASE_URL,
            },
            {
                hid: "og:title",
                name: "og:title",
                content: process.env.META_TITLE ?? "Weather App",
            },
            {
                hid: "og:description",
                name: "og:description",
                content: process.env.META_TITLE ?? "Weather App",
            },
            {
                hid: "og:image",
                name: "og:image",
                content:
                    process.env.META_IMAGE ??
                    "https://weather.pd-dev.xyz/metaImage.jpg",
            },

            { name: "format-detection", content: "telephone=no" },
        ],
        link: [
            { rel: "icon", type: "image/png", href: "icon.png" },
            { rel: "shortcurt-icon", type: "image/png", href: "icon.png" },
        ],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    // plugins: [{ src: "~/plugins/bye.ts", mode: "client" }],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Will be called on every server request. src: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-servermiddleware
    // typescript: https://typescript.nuxtjs.org/cookbook/server-middlewares/
    serverMiddleware: [
        {
            path: "/api",
            handler: "~/server-middleware/proxy.ts",
        },
    ],

    // src: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-router
    router: {
        // runs the middleware on every page navigation
        // middleware: "cookies",
    },

    // Enables calling .env stuff from the client. Only put non secret stuff in
    // here! src: https://nuxtjs.org/docs/directory-structure/nuxt-config#runtimeconfig
    publicRuntimeConfig: {
        GdprUrl: process.env.GDPR_URL || "",
        ImprintUrl: process.env.IMPRINT_URL || "",
    },

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://pwa.nuxtjs.org/setup
        "@nuxtjs/pwa",
        // https://go.nuxtjs.dev/typescript
        "@nuxt/typescript-build",
        // https://go.nuxtjs.dev/tailwindcss
        "@nuxtjs/tailwindcss",
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        "@nuxtjs/axios",
        // https://www.npmjs.com/package/cookie-universal-nuxt
        // "cookie-universal-nuxt",
        "@nuxtjs/i18n",
        // https://github.com/Maronato/vue-toastification/tree/main#installation
        "vue-toastification/nuxt",
    ],

    // internationalization: https://i18n.nuxtjs.org/
    i18n: {
        // TODO(pierre): set this up for 'en' and expand once app is usable.
        locales: ["en"], //  "de", "es", "fr"],
        defaultLocale: "en",
        vueI18nLoader: true,
        vueI18n: {
            fallbackLocale: "en",
            messages: {
                en: {
                    welcome: "Welcome",
                },
            },
        },
    },

    axios: {
        proxy: true, // Can be also an object with default options
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    // pwa config src: https://pwa.nuxtjs.org/
    pwa: {
        meta: {
            appleStatusBarStyle: "black",
            nativeUI: true,
        },
        icon: {
            fileName: "icon.png",
        },
        manifest: {
            name: "Libre Weather",
            short_name: "Libre Weather",
            lang: "en",
            description: process.env.META_DESCRIPTION ?? "Libre Weather",
            // src: https://github.com/nuxt-community/pwa-module/issues/94
            crossorigin: "use-credentials",
            // src: same as web.dev page from google. Check their application
            // tab in chrome.
            start_url: "/",
        },
    },
};
