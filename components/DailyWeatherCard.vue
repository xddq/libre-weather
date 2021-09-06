<template>
    <!--
    @author Pierre Dahmani
    @created 05.09.2021
    @file Displays the daily weather for the next X days.
-->
    <daily-weather-chart
        class="w-full px-2 flex justify-center items-center"
        :chart-data="chartData"
        :chart-options="chartOptions"
        :chart-tick-images="images"
    ></daily-weather-chart>
</template>

<script lang="ts">
// function imports
import { Component, Vue, Prop } from "nuxt-property-decorator";
// type and interface imports
import { Chart } from "@types/chart.js";
import { Daily } from "~/types/weather";
import { chartColors } from "~/types/color";
// component imports
import DailyWeatherChart from "~/components/DailyWeatherChart.vue";

@Component({ name: "DailyWeatherCard", components: { DailyWeatherChart } })
export default class DailyWeatherCard extends Vue {
    /**
     * @description Hourly data which is used to create the dataset for the
     * child component.
     */
    @Prop({ type: Array, default: [] }) weatherData!: Daily[];

    // images that will be passed into the weather chart. used for displaying
    // weather icons for the specific time/tick.
    images: string[] = [];

    /**
     * @description Constructs data for our daily weather chart. Takes the next
     * 7 entries resulting in a 7 day forecast.
     */
    get chartData(): Chart.ChartData {
        if (this.weatherData === []) {
            return {};
        }
        const dailyWeather = this.weatherData;
        const minTemperatures = [];
        const maxTemperatures = [];
        const days = [];
        this.images = [];
        // iterates through the data once, creating relevant data sets.
        dailyWeather.slice(0, 7).forEach((dataPoint) => {
            minTemperatures.push(dataPoint.temp.min);
            maxTemperatures.push(dataPoint.temp.max);
            days.push(new Date(dataPoint.dt * 1000).getUTCDate());
            this.images.push(`${dataPoint.weather[0].icon}-50x50.png`);
        });
        const minTemperaturesDataset: Chart.ChartDataSets = {
            label: this.$t("minTemperatures"),
            borderColor: chartColors.lowTemperature,
            data: minTemperatures,
            fill: false,
        };
        const maxTemperaturesDataset: Chart.ChartDataSets = {
            label: this.$t("maxTemperatures"),
            borderColor: chartColors.highTemperature,
            backgroundColor: chartColors.fillColorHighAndLow,
            data: maxTemperatures,
            fill: 0,
        };

        return {
            labels: days,
            datasets: [minTemperaturesDataset, maxTemperaturesDataset],
        };
    }

    get chartOptions(): Chart.ChartOptions {
        return {
            legend: {
                labels: {
                    // filter labels for this graph. If we would pass label: "",
                    // or dont define it, it would still be displayed with "" or
                    // undefined.
                    filter(_: Chart.ChartLegendItem, __) {
                        return false;
                        // only show 2nd dataset in legend (legendItem -> _)
                        // return !legendItem.text.includes("temperature");
                    },
                    // NOTE(pierre): could adapt label config. src:
                    // https://github.com/chartjs/Chart.js/issues/9339
                },
                position: "bottom",
            },
            title: {
                display: true,
                position: "top",
                text: this.$t("dailyData"),
                padding: 35,
            },
        };
    }
}
</script>

<i18n>
{
  "en": {
    "dailyData": "daily weather data",
    "minTemperatures": "lowest temperature",
    "maxTemperatures": "highest temperature"
  }
}
</i18n>
