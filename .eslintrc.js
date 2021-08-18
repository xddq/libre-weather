module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    extends: [
        "@nuxtjs/eslint-config-typescript",
        "plugin:nuxt/recommended",
        // prettier last to overwrite all format rules that could mess up pretter
        "plugin:prettier/recommended",
    ],
    plugins: [],
    // add your custom rules here
    rules: {},
};
