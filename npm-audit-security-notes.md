# npm audit security

-   2022-06-22: When we run "npm audit" we get the following security adivsories:

```
# npm audit report

glob-parent  <5.1.2
Severity: high
Regular expression denial of service in glob-parent - https://github.com/advisories/GHSA-ww39-953v-wcq6
fix available via `npm audit fix --force`
Will install nuxt@2.13.3, which is a breaking change
node_modules/watchpack-chokidar2/node_modules/glob-parent
  chokidar  1.0.0-rc1 - 2.1.8
  Depends on vulnerable versions of glob-parent
  node_modules/watchpack-chokidar2/node_modules/chokidar
    watchpack-chokidar2  *
    Depends on vulnerable versions of chokidar
    node_modules/watchpack-chokidar2
      watchpack  1.7.2 - 1.7.5
      Depends on vulnerable versions of watchpack-chokidar2
      node_modules/watchpack
        webpack  4.44.0 - 4.46.0
        Depends on vulnerable versions of watchpack
        node_modules/webpack
          @nuxt/webpack  *
          Depends on vulnerable versions of cssnano
          Depends on vulnerable versions of webpack
          node_modules/@nuxt/webpack
            @nuxt/builder  >=2.14.0
            Depends on vulnerable versions of @nuxt/webpack
            node_modules/@nuxt/builder
            nuxt  2.14.0 - 2.15.8
            Depends on vulnerable versions of @nuxt/webpack
            node_modules/nuxt

nth-check  <2.0.1
Severity: high
Inefficient Regular Expression Complexity in nth-check - https://github.com/advisories/GHSA-rp65-9cf3-cjxr
fix available via `npm audit fix --force`
Will install nuxt@2.13.3, which is a breaking change
node_modules/svgo/node_modules/nth-check
  css-select  <=3.1.0
  Depends on vulnerable versions of nth-check
  node_modules/svgo/node_modules/css-select
    svgo  1.0.0 - 1.3.2
    Depends on vulnerable versions of css-select
    node_modules/svgo
      postcss-svgo  4.0.0-nightly.2020.1.9 - 5.0.0-rc.2
      Depends on vulnerable versions of svgo
      node_modules/postcss-svgo
        cssnano-preset-default  <=4.0.8
        Depends on vulnerable versions of postcss-svgo
        node_modules/cssnano-preset-default
          cssnano  4.0.0-nightly.2020.1.9 - 4.1.11
          Depends on vulnerable versions of cssnano-preset-default
          node_modules/cssnano
            @nuxt/webpack  *
            Depends on vulnerable versions of cssnano
            Depends on vulnerable versions of webpack
            node_modules/@nuxt/webpack
              @nuxt/builder  >=2.14.0
              Depends on vulnerable versions of @nuxt/webpack
              node_modules/@nuxt/builder
              nuxt  2.14.0 - 2.15.8
              Depends on vulnerable versions of @nuxt/webpack
              node_modules/nuxt
            optimize-css-assets-webpack-plugin  3.2.1 || 5.0.0 - 5.0.8
            Depends on vulnerable versions of cssnano
            node_modules/optimize-css-assets-webpack-plugin

15 high severity vulnerabilities

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force

```

Based on[this
issue](https://github.com/nuxt/nuxt.js/issues/9284#issuecomment-1067876378) and
the comment by daniel roe (core nuxt dev) these dependencies are only used for
building the app and won't be included in the nuxt app.

In general we have to be really careful with packages in the npm ecosystem.
Carelessly updating the package-lock is not suggested.
