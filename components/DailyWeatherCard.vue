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
import { Daily } from "~/types/weather";
import { ChartColors } from "~/types/color";
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
        const minTemperatures: number[] = [];
        const maxTemperatures: number[] = [];
        const days: string[] = [];
        this.images = [];
        // iterates through the data once, creating relevant data sets.
        dailyWeather.slice(0, 7).forEach((dataPoint) => {
            minTemperatures.push(dataPoint.temp.min);
            maxTemperatures.push(dataPoint.temp.max);
            days.push(
                new Date(dataPoint.dt * 1000).toLocaleDateString("de-DE", {
                    day: "2-digit",
                    month: "2-digit",
                })
            );
            this.images.push(`${dataPoint.weather[0].icon}-50x50.png`);
        });
        /*
         * NOTE(pierre): Labels will be filtered out on purpose for our
         * datasets. See legend.labels.filter in the chartOptions.
         */
        const minTemperaturesDataset: Chart.ChartDataSets = {
            label: this.ensureString(this.$t("minTemperatures")),
            borderColor: ChartColors.lowTemperature,
            data: minTemperatures,
            fill: false,
        };
        const maxTemperaturesDataset: Chart.ChartDataSets = {
            label: this.ensureString(this.$t("maxTemperatures")),
            borderColor: ChartColors.highTemperature,
            backgroundColor: ChartColors.fillColorHighAndLow,
            data: maxTemperatures,
            fill: 0,
        };

        return {
            labels: days,
            datasets: [minTemperaturesDataset, maxTemperaturesDataset],
        };
    }

    /**
     * @description Ensures that a string is returned from given input. Used because
     * this.$t returns TranslateResult which could be an Object.
     */
    ensureString(input: any): string {
        return typeof input === "string" ? input : "";
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
                    },
                },
                position: "bottom",
            },
            title: {
                display: true,
                position: "top",
                text: this.ensureString(this.$t("dailyData")),
                padding: 35,
            },
            scales: {
                yAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: this.ensureString(
                                this.$t("yAxesLabel")
                            ),
                            padding: 2,
                        },
                    },
                ],
                xAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: this.ensureString(
                                this.$t("xAxesLabel")
                            ),
                            padding: 2,
                        },
                    },
                ],
            },
        };
    }
}
// MAYBE(pierre): Adapt i18n to don't display units. rather display units based
// on config.
</script>
<i18n>
{
  "en": {
    "dailyData": "daily weather data",
    "yAxesLabel": "temperature in °C",
    "xAxesLabel": "date in DD.MM",
    "minTemperatures": "lowest temperature",
    "maxTemperatures": "highest temperature"
  }
}
</i18n>
