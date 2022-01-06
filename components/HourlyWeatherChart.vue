<template>
    <!--
    @author Pierre Dahmani
    @created 04.09.2021
    @file Displays weather box/widget.
    TODO(pierre): Probably can make daily and hourly weather chart one component
by getting the chartData and options inside the internal component.
-->
    <div class="flex w-full flex-col justify-center items-center">
        <!-- did need to use wrapper with v-if to correctly render images
                   inside hourly weather. -->
        <div v-if="haveWeatherData && displayChart">
            <internal-hourly-weather-chart
                class="flex justify-center items-center"
                :chart-data="chartData"
                :chart-options="chartOptions"
                :chart-tick-images="images"
            ></internal-hourly-weather-chart>
        </div>
        <base-button
            v-show="haveWeatherData && displayChart"
            class="hide-send-location-request"
            :width="`w-40`"
            @click="displayChart = false"
            >hide hourly chart
        </base-button>
        <base-button
            v-show="haveWeatherData && !displayChart"
            class="hide-send-location-request"
            :width="`w-40`"
            @click="displayChart = true"
            >show hourly chart
        </base-button>
    </div>
</template>

<script lang="ts">
// function imports
import { Component, Vue, Prop } from "nuxt-property-decorator";
// type and interface imports
import { Current } from "~/types/weather";
import { ChartColors } from "~/types/color";
// component imports
import WeatherBox from "~/components/WeatherBox.vue";
import InternalHourlyWeatherChart from "~/components/InternalHourlyWeatherChart.vue";

@Component({
    name: "HourlyWeatherChart",
    components: { WeatherBox, InternalHourlyWeatherChart },
})
export default class HourlyWeatherChart extends Vue {
    /**
     * @description Hourly data which is used to create the dataset for the
     * child component.
     */
    @Prop({ type: Array, default: [] }) weatherData!: Current[] | null;
    displayChart: boolean = true;

    get haveWeatherData() {
        return this.weatherData !== null;
    }

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
     */
    ensureString(input: any): string {
        return typeof input === "string" ? input : "";
    }

    get chartOptions(): Chart.ChartOptions {
        return {
            // adds padding in px I guess?
            // src: https://www.chartjs.org/docs/3.5.1/general/padding.html
            layout: {
                padding: {
                    left: 40,
                    right: 60,
                },
            },
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
