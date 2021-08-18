module.exports = {
    // faster build time, less ressources in dev. BUT may contain bugs, not a
    // stable feature.
    mode: "jit",
    // where we look for used styles. If the used style string is NOT found, it
    // will be purged from our .css file.
    purge: [
        "./components/**/*.{vue,js}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
