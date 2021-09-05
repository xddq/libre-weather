<template>
    <!--
    @author Pierre Dahmani
    @created 04.09.2021
    @file Displays weatherboxes for the next X (default 10) hours (TODO(pierre): set X in
settings?
-->
    <hourly-weather-chart
        class="w-full px-2 flex justify-center items-center"
        :chart-data="chartData"
        :chart-options="chartOptions"
    ></hourly-weather-chart>
</template>

<script lang="ts">
// function imports
import { Component, Vue, Prop } from "nuxt-property-decorator";
// type and interface imports
import { Chart } from "@types/chart.js";
import { WeatherResponse } from "~/types/Weather";
// component imports
import WeatherBox from "~/components/WeatherBox.vue";
import HourlyWeatherChart from "~/components/HourlyWeatherChart.vue";
import TestChart from "~/components/TestChart.vue";

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

    /**
     * @description Constructs data for our hourly weather chart. Takes the next ten
     * entries resulting in a 10 hour forecast.
     */
    get chartData(): Chart.ChartData {
        if (this.weatherData === null) {
            return {};
        }
        const hourlyWeather = this.weatherData.hourly;
        const temperatures = [];
        const hours = [];
        // iterates once through the data, creating relevant data sets.
        hourlyWeather.forEach((dataPoint) => {
            temperatures.push(dataPoint.temp);
            hours.push(
                new Date(dataPoint.dt * 1000).toLocaleTimeString("de-DE", {
                    hour: "2-digit",
                })
            );
        });
        const temperatureDataset = {
            label: this.$t("temperature"),
            backgroundColor: "#f87979",
            data: temperatures.slice(0, 10),
        };
        return {
            labels: hours.slice(0, 10),
            datasets: [temperatureDataset],
        };
    }

    get chartOptions(): Chart.ChartOptions {
        return {
            title: {
                display: true,
                position: "top",
                text: this.$t("hourlyData"),
            },
            scales: {
                y: {
                    // the data minimum used for determining the ticks is Math.min(dataMin, suggestedMin)
                    // makes sure we start at 0 (if temperature is >= 0)
                    suggestedMin: 0,
                },
            },
        };
    }
}
</script>

<i18n>
{
  "en": {
    "hourlyData": "hourly weather data",
    "temperature": "temperature"
  }
}
</i18n>
