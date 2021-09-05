<template>
    <!--
    @author Pierre Dahmani
    @created 04.09.2021
    @file Displays weatherboxes for the next x(default 10) hours (TODO(pierre): set X in
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
        const images = [];
        // iterates through the data once, creating relevant data sets.
        hourlyWeather.forEach((dataPoint) => {
            temperatures.push(dataPoint.temp);
            hours.push(new Date(dataPoint.dt * 1000).getHours());
            // TODO(pierre): rather use/pass chartimages as prop.
            // images will be used for the afterDraw plugin inside the chart.
            images.push(`${dataPoint.weather[0].icon}-hourly.png`);
        });
        const temperatureDataset = {
            label: this.$t("temperature"),
            backgroundColor: "#f87979",
            data: temperatures.slice(0, 10),
            img: images.slice(0, 10),
        };
        return {
            labels: hours.slice(0, 10),
            datasets: [temperatureDataset],
        };
    }

    get chartOptions(): Chart.ChartOptions {
        return {
            legend: {
                position: "bottom",
            },
            title: {
                display: true,
                position: "top",
                text: this.$t("hourlyData"),
                padding: 35,
            },
            // NOTE(pierre): just some testing. this syntax works.
            // scales: {
            //     yAxes: [
            //         {
            //             ticks: {
            //                 // Include a dollar sign in the ticks
            //                 callback(value, index, values) {
            //                     return "$" + value;
            //                 },
            //             },
            //         },
            //     ],
            //     xAxes: [
            //         {
            //             ticks: {
            //                 // Include a dollar sign in the ticks
            //                 callback(value, index, values) {
            //                     return "$" + value;
            //                 },
            //                 // beginAtZero: true,
            //             },
            //         },
            //     ],
            // },
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
