<template>
    <!--
    @author Pierre Dahmani
    @created 04.09.2021
    @file Displays weatherboxes for the next X (default 8) hours (TODO(pierre): set X in
settings?
-->
    <div class="w-full flex flex-col justify-center items-center">
        <div class="description">weather for the next 12 hours</div>
        <test-chart></test-chart>
        <hourly-weather-chart
            :weather-data="hourlyWeather"
        ></hourly-weather-chart>
    </div>
</template>

<script lang="ts">
// function imports
import { Component, Vue, Prop } from "nuxt-property-decorator";
// component imports
import WeatherBox from "~/components/WeatherBox.vue";
import HourlyWeatherChart from "~/components/HourlyWeatherChart.vue";
import TestChart from "~/components/TestChart.vue";
// type and interface imports
import { Current, WeatherResponse } from "~/types/Weather";

@Component({
    name: "HourlyWeatherCard",
    components: { WeatherBox, HourlyWeatherChart, TestChart },
})
export default class HourlyWeatherCard extends Vue {
    /**
     * @description All required weather data which is used to display the
     * informations. Will be passed to the child component.
     */
    @Prop() weatherData!: WeatherResponse | null;

    get hourlyWeather(): Current[] {
        if (this.weatherData === null) {
            return [];
        }
        return this.weatherData.hourly;
    }
}
</script>

<style scoped></style>
