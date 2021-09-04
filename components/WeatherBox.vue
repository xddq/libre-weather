<template>
    <!--
    @author Pierre Dahmani
    @created 02.09.2021
    @file Displays weather data for a given location.
-->
    <div class="flex flex-col w-full px-2 pt-2">
        <div class="weather-widget flex flex-col w-full border border-red-300">
            <!-- TODO(pierre): how to make this icon square?
                maybe check this: https://carlanderson.xyz/how-to-keep-your-flexbox-square/ -->
            <div class="basic-current-infos flex w-full">
                <div
                    class="
                        icon-description
                        flex flex-col
                        w-1/3
                        h-auto
                        items-center
                        justify-center
                        border border-red-300
                    "
                >
                    <div
                        class="
                            icon
                            flex
                            w-full
                            items-center
                            justify-center
                            text-center
                            h-2/3
                        "
                    >
                        icon here
                    </div>
                    <div
                        class="
                            description
                            flex
                            justify-center
                            items-center
                            w-full
                            text-center
                            overflow-hidden
                            border border-green-300
                            h-1/3
                        "
                    >
                        {{ description }}
                    </div>
                </div>
                <div
                    class="
                        text-info-weather
                        flex flex-col
                        justif-center
                        items-center
                        w-2/3
                        h-auto
                        border border-green-300
                    "
                >
                    <div
                        class="
                            city-and-state
                            flex
                            w-full
                            justify-center
                            items-center
                            text-center
                            border border-red-300
                        "
                    >
                        {{ location }}
                    </div>
                    <div
                        class="
                            temp
                            flex
                            w-full
                            justify-center
                            items-center
                            border border-red-300
                        "
                    >
                        {{ temperature }}
                    </div>
                    <div class="wind">{{ wind }}</div>
                    <div class="humidity">{{ humidity }}</div>
                    <div class="pressure">{{ pressure }}</div>
                </div>
            </div>
            <div
                class="
                    hourly-and-weekly
                    flex
                    items-center
                    justify-start justify-items-start
                    w-full
                    border border-green-300
                "
            >
                <div
                    class="
                        hourly
                        text
                        flex
                        items-center
                        justify-center
                        text-center
                        w-1/3
                        border border-red-300
                    "
                >
                    hourly stuff
                </div>
                <div
                    class="
                        weekly
                        text
                        flex
                        items-center
                        justify-center
                        text-center
                        w-1/3
                        border border-red-300
                    "
                >
                    weekly stuff
                </div>
                <div
                    class="
                        icon
                        flex
                        text-center
                        w-1/3
                        items-center
                        justify-center
                    "
                >
                    up or down
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
// function imports
import { Component, Vue, Prop } from "nuxt-property-decorator";
// component imports
// type and interface imports
import { WeatherResponse } from "~/types/Weather";

@Component
export default class WeatherBox extends Vue {
    @Prop() weatherData!: WeatherResponse | null;

    get description() {
        if (this.weatherData == null) {
            return "waiting for your query";
        }
        return this.weatherData.current.weather[0].description;
    }

    get location() {
        if (this.weatherData === null) {
            return "waiting for your query";
        }
        if (this.weatherData?.state === undefined) {
            return `City: ${this.weatherData.city}
                    Country: ${this.weatherData.country}`;
        }
        return `City: ${this.weatherData.city} State: ${this.weatherData.state}
                    Country: ${this.weatherData.country}`;
    }

    get temperature() {
        if (this.weatherData === null) {
            return "waiting for your query";
        }
        return `Temperature: ${this.weatherData.current.feels_like}°C`;
    }

    get wind() {
        if (this.weatherData === null) {
            return "waiting for your query";
        }
        return `Wind speed: ${this.weatherData.current.wind_speed}m/s`;
    }

    get humidity() {
        if (this.weatherData === null) {
            return "waiting for your query";
        }
        return `Humidity: ${this.weatherData.current.humidity}%`;
    }

    get pressure() {
        if (this.weatherData === null) {
            return "waiting for your query";
        }
        return `air pressure: ${this.weatherData.current.pressure} hPa`;
    }
}
</script>

<i18n>
{
  "en": {
    "hello": "hello world!"
  },
  "ja": {
    "hello": "こんにちは、世界"
  }
}
</i18n>

<style scoped></style>
