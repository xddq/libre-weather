# Libre Weather

-   Libre Weather is an open source weather PWA(progressive web app).
-   It works on Android and iOS devices.
-   No tracking, no ads.
-   Can be downloaded to behave like normal app.
-   Weather data provided by the [openweathermap](https://openweathermap.org/).
-   Proxies the requests to hide you from the api provider.
-   But also allows you to use your own api key.

# Quickstart

1. Using the public instance on [https://weather.pd-dev.xyz](https://weather.pd-dev.xyz)
2. Hosting your own instance!
    - clone this repo onto your server `git clone git@github.com:xddq/libre-weather.git`
    - copy the example .env file and fill in the required fields. `cp .env.example .env`
    - configure your reverse proxy to work with the compose or open the required
      ports in the docker-compose.
    - spin up the container `docker-compose up -d`

## DEMO

| install                                                                                    | usage                                                                                    |
| ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| <img src="https://github.com/xddq/libre-weather/blob/main/static/install.gif" width="300"> | <img src="https://github.com/xddq/libre-weather/blob/main/static/usage.gif" width="300"> |

# Notes

-   Releases use [semantic versioning](https://semver.org/)
-   Any contribution is highly appreciated. If you want to get something done,
    just hit me up at git@pierrefhapp.dev for now. I did prepare a small list of
    possible tasks inside the [open-ideas-tasks](https://github.com/xddq/libre-weather/blob/main/open-ideas-tasks) file.

# Security Advisory

-   especially applicable when self hosting!
-   please check the file [npm-audit-security-notes.md](https://github.com/xddq/libre-weather/blob/main/npm-audit-security-notes.md)

# Technologies

-   frontend framework: nuxt, vue
-   language: typescript
-   pwa: nuxt pwa module
-   charts: chartjs
-   proxy that allows using your own api key: express middleware hooked into nuxt
    connect instance.
-   i18n: added the i18n plugin for nuxt (currently only having english
    translations)
-   linting: eslint
-   formatting: prettier
-   styling: tailwindcss
-   build/deploy: docker / docker-compose file

#### LICENSE HEADER
Libre Weather. A libre weather app used to display a weather forecast.

Copyright (C) 2022 Pierre Dahmani 

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, version 3.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>. 

# Licenses

-   The weather data and the weather icons are provided by OpenWeatherMap, under the Creative Commons licence.
-   Meta image taken from: [unsplash](https://unsplash.com/photos/mODxn7mOzms?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink)
-   App Icon made by [Freepik](https://www.freepik.com) from [FlatIcon](https://www.freepik.com)
