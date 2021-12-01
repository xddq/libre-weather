# Libre Weather

- Libre Weather is an open source weather pwa(progressive web app).
- You can either use the publicly hosted instance on [my
  server](https://www.weather.pd-dev.xyz) or simply host your own instance.
- Once you browse the app with your mobile phone you can just download it and
  have it behave like a normal app.

# Quickstart
1. Using the public instance:
    - browse to [libre weather](https://www.weather.pd-dev.xyz) and use the app.
    - done
2. Hosting your own instance:
    - clone this repo onto your server `git clone
      git@github.com:Pierrefha/libre-weather.git`
    - copy the example .env file and fill in the required fields. `cp
      .env.example .env`
    - take the example compose and just copy it over `cp
      docker-compose.yml.example docker-compose.yml`
    - spin up the container docker-compose up -d
    - browse your servers ip (lets say it has the ip 222.222.222.222) and then
      browse to http://222.222.222.222:3000
    - done

# Licenses

- The weather data and the weather icons are provided by OpenWeatherMap, under the Creative Commons licence.
- Meta image taken from: [unsplash](https://unsplash.com/photos/mODxn7mOzms?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink)
- App Icon made by [Freepik](https://www.freepik.com) from [FlatIcon](https://www.freepik.com)
