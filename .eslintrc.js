module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    extends: [
        "@nuxtjs/eslint-config-typescript",
        "plugin:nuxt/recommended",
        "prettier",
    ],
    plugins: [],
    // add your custom rules here
    rules: {
        // order of imports is fixed in whole app. Did not match the suggested
        // order(which I find confusing/unordered) so disable it.
        "import/order": "off",
    },
};
