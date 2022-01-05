<template>
    <div class="flex flex-col w-full justify-center items-center">
        <EnterLocationWidget
            :enter-location="enterLocation"
            :display-loading="displayLoading"
            @evaluateSearch="evaluateSearch"
        />
        <weather-box class="px-2 mt-2" :weather-data="weatherData" />
        <hourly-weather-chart
            class="mt-2"
            :weather-data="hourlyWeather"
        ></hourly-weather-chart>
        <daily-weather-chart
            class="mt-2"
            :weather-data="dailyWeather"
        ></daily-weather-chart>
    </div>
</template>

<script lang="ts">
import { TYPE, POSITION } from "vue-toastification";
// function imports
import { Component, Vue } from "nuxt-property-decorator";
// component imports
import WeatherBox from "~/components/WeatherBox.vue";
import HourlyWeatherChart from "~/components/HourlyWeatherChart.vue";
import DailyWeatherChart from "~/components/DailyWeatherChart.vue";
import EnterLocationWidget from "~/components/EnterLocationWidget.vue";
// type and interface imports
import { WeatherResponse } from "~/types/weather";

@Component({
    name: "LandingPage",
    components: {
        WeatherBox,
        HourlyWeatherChart,
        DailyWeatherChart,
        EnterLocationWidget,
    },
})
export default class LandingPage extends Vue {
    weatherData: WeatherResponse | null = null;
    // decides whether we display the loading spinner.
    displayLoading: boolean = false;
    // decides whether the location input widget is shown.
    enterLocation: boolean = false;
    // determines whether the hourly data will be displayed
    hourly: boolean = false;
    // determines whether the daily data will be displayed
    daily: boolean = false;

    toggleHourly() {
        this.daily = false;
        this.hourly = !this.hourly;
    }

    toggleDaily() {
        this.hourly = false;
        this.daily = !this.daily;
    }

    get hourlyWeather() {
        return this.weatherData?.hourly ?? [];
    }

    get dailyWeather() {
        return this.weatherData?.daily ?? [];
    }

    /**
     * @description Evaluates the search by validating the input and displaying
     * a loading spinner while fetching the api request.
     * TODO(pierre): make params a data type, probably use axios data type?
     */
    async evaluateSearch(params: any) {
        // display loading spinner for user experience for 750ms.
        this.displayLoading = true;
        const showLoading = new Promise((resolve) =>
            setTimeout(() => {
                this.displayLoading = false;
                return resolve;
            }, 750)
        );
        // display loading spinner for 750ms while fetching the query.
        const result = await Promise.all([showLoading, this.fetchApi(params)]);
        // displa the enter location widget depending on the success state
        // of our fetchApi call.
        this.enterLocation = result[1];
    }

    async fetchApi(params: any) {
        try {
            const result = await this.$axios.get("/api/weather", params);
            this.weatherData = result.data;
            console.log(result.data);
            return false;
        } catch (e) {
            console.log(e);
            this.$toast("Got an error calling the weather api.", {
                type: TYPE.ERROR,
                position: POSITION.BOTTOM_CENTER,
                bodyClassName: "text-center",
            });
            return true;
        }
    }
}
</script>

<style scoped></style>
