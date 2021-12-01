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
        :chart-tick-images="images"
    ></hourly-weather-chart>
</template>

<script lang="ts">
// function imports
import { Component, Vue, Prop } from "nuxt-property-decorator";
// type and interface imports
import { Current } from "~/types/weather";
import { ChartColors } from "~/types/color";
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
     * @description Hourly data which is used to create the dataset for the
     * child component.
     */
    @Prop({ type: Array, default: [] }) weatherData!: Current[];

    // images that will be passed into the weather chart. used for displaying
    // weather icons for the specific time/tick.
    images: string[] = [];

    /**
     * @description Constructs data for our hourly weather chart. Takes the next ten
     * entries resulting in a 10 hour forecast.
     */
    get chartData(): Chart.ChartData {
        if (this.weatherData === null) {
            return {};
        }
        const hourlyWeather = this.weatherData;
        const temperatures: number[] = [];
        const hours: number[] = [];
        this.images = [];
        // iterates through the data once, creating relevant data sets.
        hourlyWeather.slice(0, 10).forEach((dataPoint) => {
            temperatures.push(dataPoint.temp);
            // MAYBE(pierre): get 12 hour format (Xam, Ypm, etc..) depending on locale.
            hours.push(new Date(dataPoint.dt * 1000).getHours());
            this.images.push(`${dataPoint.weather[0].icon}-50x50.png`);
        });
        const temperatureDataset = {
            label: this.ensureString(this.$t("temperature")),
            borderColor: ChartColors.defaultColor,
            data: temperatures,
            fill: false,
        };
        return {
            labels: hours,
            datasets: [temperatureDataset],
        };
    }

    /**
     * @description Ensures that a string is returned from given input. Used because
     * this.$t returns TranslateResult which could be an Object.
     * TODO(pierre): create util for that and reuse.
     */
    ensureString(input: any): string {
        return typeof input === "string" ? input : "";
    }

    get chartOptions(): Chart.ChartOptions {
        return {
            legend: {
                position: "bottom",
            },
            title: {
                display: true,
                position: "top",
                text: this.ensureString(this.$t("hourlyData")),
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
            // }
        };
    }
}
// TODO(pierre): adapt i18n to don't display units. rather display units based
// on config.
</script>

<i18n>
{
  "en": {
    "hourlyData": "hourly weather data",
    "temperature": "temperature",
    "yAxesLabel": "temperature in °C",
    "xAxesLabel": "current hour"
  }
}
</i18n>
