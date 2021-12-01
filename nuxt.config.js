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

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

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

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        "@nuxt/typescript-build",
        // https://go.nuxtjs.dev/tailwindcss
        "@nuxtjs/tailwindcss",
        // https://pwa.nuxtjs.org/setup
        "@nuxtjs/pwa",
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        "@nuxtjs/axios",
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

    // pwa config
    // src: https://pwa.nuxtjs.org/manifest/#default-options
    pwa: {
        manifest: {
            name: "Libre Weather",
            short_name: "Libre Weather",
            lang: "en",
        },
    },
};
