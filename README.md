# Libre Weather

- Libre Weather is an open source weather pwa(progressive web app).
- You can either use the publicly hosted instance on
  [here](https://weather.pd-dev.xyz) or simply host your own instance.
- Once you browse the app with your mobile phone you can just download it and
  have it behave like a normal app.

# Quickstart
1. Using the public instance:
    - browse to [libre weather](https://weather.pd-dev.xyz) and use the app.
2. Hosting your own instance:
    - clone this repo onto your server `git clone
      git@github.com:xddq/libre-weather.git`
    - copy the example .env file and fill in the required fields. `cp
      .env.example .env`
    - configure your reverse proxy to work with the compose or open the required
      ports in the docker-compose.
    - spin up the container `docker-compose up -d`

# Notes
- Releases use [semantic versioning](https://semver.org/)
- Any contribution is highly appreciated. If you want to get something done,
  just hit me up at git@pierrefhapp.dev for now.

# Technologies
- frontend framework: nuxt, vue
- language: typescript
- pwa: nuxt pwa module
- charts: chartjs
- proxy that allows using your own api key: express middleware hooked into nuxt
  connect instance.
- i18n: added the i18n plugin for nuxt (currently only having english
  translations)
- linting: eslint
- formatting: prettier
- styling: tailwindcss
- build/deploy: docker / docker-compose file

# Licenses

- The weather data and the weather icons are provided by OpenWeatherMap, under the Creative Commons licence.
- Meta image taken from: [unsplash](https://unsplash.com/photos/mODxn7mOzms?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink)
- App Icon made by [Freepik](https://www.freepik.com) from [FlatIcon](https://www.freepik.com)
