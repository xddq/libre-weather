<template>
    <div class="flex flex-col w-full justify-center items-center">
        <div class="flex">
            <EnterLocationWidget
                :enter-location="enterLocation"
                :display-loading="displayLoading"
                @evaluateSearch="evaluateSearch"
            />
        </div>
        <!-- MAYBE(pierre): make this a base radio button component. -->
        <div class="pick-unit text-white">
            <!-- use vbind value to return boolean values. -->
            <!-- src: https://stackoverflow.com/questions/45187048/vue-binding-radio-to-boolean -->
            <input
                id="metric"
                v-model="useImperialSystem"
                type="radio"
                :value="false"
            />
            <label for="metric">Metric</label>
            <input
                id="imperial"
                v-model="useImperialSystem"
                type="radio"
                :value="true"
            />
            <label for="imperial">Imperial</label>
        </div>
        <weather-box
            class="px-2 mt-2"
            :city="city"
            :weather-data="currentWeather"
        />
        <hourly-weather-chart
            class="mt-2"
            :weather-data="hourlyWeather"
        ></hourly-weather-chart>
        <!-- MAYBE(pierre): does this lazy loading/dynamic importing work? Measure it. -->
        <!-- src: https://nuxtjs.org/docs/directory-structure/components/ -->
        <daily-weather-chart
            class="mt-2"
            :weather-data="dailyWeather"
        ></daily-weather-chart>
        <weather-boxes
            class="px-2 mt-2"
            :hourly-weather-data="hourlyWeather"
            :city="city"
            :default-display-hourly="false"
            :default-display-daily="false"
        />
    </div>
</template>

<script lang="ts">
import { TYPE, POSITION } from "vue-toastification";
// function imports
import { Component, Vue } from "nuxt-property-decorator";
import { store } from "~/weather-store/store";
// component imports
import BaseButton from "~/components/base/button.vue";
import WeatherBoxes from "~/components/WeatherBoxes.vue";
import WeatherBox from "~/components/WeatherBox.vue";
import HourlyWeatherChart from "~/components/HourlyWeatherChart.vue";
import DailyWeatherChart from "~/components/DailyWeatherChart.vue";
import EnterLocationWidget from "~/components/EnterLocationWidget.vue";
// type and interface imports
import { WeatherResponse } from "~/types/weather";
import { WeatherBoxCount } from "~/types/weather-non-api";

@Component({
    name: "LandingPage",
    components: {
        WeatherBox,
        WeatherBoxes,
        HourlyWeatherChart,
        DailyWeatherChart,
        EnterLocationWidget,
        BaseButton,
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
    sharedState = store.state;

    get useImperialSystem(): boolean {
        return this.sharedState.useImperialSystem;
    }

    set useImperialSystem(newVal) {
        store.setUseImperialSystem(newVal);
    }

    get city() {
        return this.weatherData?.city ?? null;
    }

    get currentWeather() {
        const weatherData = this.weatherData?.current;
        if (weatherData === undefined) {
            return null;
        }
        // use the pop/riskOfRain/probability of precipation for the first
        // hourly weather since we have no pop in current weather but I feel
        // like this is still a relevant information.
        weatherData.pop = this.hourlyWeather?.[0]?.pop;
        return weatherData;
    }

    /** The length of this array determines the amount of boxes which will be
     * rendered for the weatherboxes component. **/
    get hourlyWeather() {
        // MAYBE(pierre): Could later enable setting amount of hours in config
        // in app frontend. For now make them fixed/const.
        return (
            this.weatherData?.hourly.slice(0, WeatherBoxCount.Hourly) ?? null
        );
    }

    /** The length of this array determines the amount of boxes which will be
     * rendered for the weatherboxes component. **/
    get dailyWeather() {
        return this.weatherData?.daily.slice(0, WeatherBoxCount.Daily) ?? null;
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
                return resolve;
            }, 750)
        );
        // display loading spinner for at least 750ms while fetching the query.
        const result = await Promise.all([showLoading, this.fetchApi(params)]);
        this.displayLoading = false;
        // displa the enter location widget depending on the success state
        // of our fetchApi call.
        this.enterLocation = result[1];
    }

    async fetchApi(params: any) {
        try {
            const result = await this.$axios.get("/api/weather", params);
            this.weatherData = result.data;
            // console.log(result.data);
            return false;
        } catch (e) {
            // console.log(e);
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
