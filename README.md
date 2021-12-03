# Libre Weather

- Libre Weather is an open source weather pwa(progressive web app).
- You can either use the publicly hosted instance on
  [here](https://www.weather.pd-dev.xyz) or simply host your own instance.
- Once you browse the app with your mobile phone you can just download it and
  have it behave like a normal app.

# Quickstart
1. Using the public instance:
    - browse to [libre weather](https://www.weather.pd-dev.xyz) and use the app.
    - done
2. Hosting your own instance:
    - clone this repo onto your server `git clone
      git@github.com:xddq/libre-weather.git`
    - copy the example .env file and fill in the required fields. `cp
      .env.example .env`
    - take the example compose and just copy it over `cp
      docker-compose.yml.example docker-compose.yml`
    - spin up the container docker-compose up -d
    - browse your servers ip (lets say it has the ip 192.168.0.1) and then
      browse to http://192.168.0.1:3000
    - done

# Notes
- If you have feedback/suggestions just create an issue.
- If you want to design the frontend, I am happy to code your design. Again,
  just create an issue and we will get in touch.
- There is a document called "PLAN" which states the features I will perhaps
  add. If you want to help with any of them, let me know. Again, can just create
an issue.
- Releases use [semantic versioning](https://semver.org/)

# Technologies
- frontend framework: nuxt
- language: typescript, vue
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
