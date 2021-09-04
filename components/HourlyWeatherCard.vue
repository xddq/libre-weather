<template>
    <!--
    @author Pierre Dahmani
    @created 04.09.2021
    @file Displays weatherboxes for the next X (default 10) hours (TODO(pierre): set X in
settings?
-->
    <div class="w-full flex flex-col justify-center items-center">
        <div class="description">weather for the next 12 hours</div>
        <hourly-weather-chart
            :chart-data="chartData"
            :option="chartOptions"
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
import { WeatherResponse } from "~/types/Weather";

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
            label: this.$t("hourlyData"),
            backgroundColor: "#f87979",
            data: temperatures.slice(0, 10),
        };
        return {
            labels: hours.slice(0, 10),
            datasets: [temperatureDataset],
        };
    }

    get chartOptions() {}
}
</script>

<i18n>
{
  "en": {
    "hourlyData": "hourly temperature"
  }
}
</i18n>
