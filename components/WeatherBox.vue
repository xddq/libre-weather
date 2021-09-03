<template>
    <!--
    @author Pierre Dahmani
    @created 02.09.2021
    @file Displays weather data for a given location.
-->
    <div class="flex flex-col w-full px-2 pt-2">
        <div class="weather-widget flex w-full">
            <!-- TODO(pierre): how to make this icon square?
                maybe check this: https://carlanderson.xyz/how-to-keep-your-flexbox-square/ -->
            <div
                class="
                    icon-description
                    flex flex-col
                    w-1/3
                    h-auto
                    border border-red-300
                "
            >
                <div class="icon border border-green-300 h-2/3">icon here</div>
                <div
                    class="
                        description
                        overflow-hidden
                        border
                        broder-green-300
                        h-1/3
                    "
                >
                    description here
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
                    {{ city }}
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

    get city() {
        console.log(this.weatherData);
        if (this.weatherData === null) {
            return "waiting for your query";
        }
        return `City: ${this.weatherData.city}
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
        return `humidity: ${this.weatherData.current.humidity}%`;
    }

    get pressure() {
        if (this.weatherData === null) {
            return "waiting for your query";
        }
        return `air pressure: ${this.weatherData.current.pressure} hPa`;
    }
}
</script>

<style scoped></style>
