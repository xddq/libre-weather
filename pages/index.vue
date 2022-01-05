<template>
    <div>
        <!-- <TestComponent /> -->
        <div
            class="
                flex flex-col
                items-center
                justify-center
                w-full
                mt-4
                location-input
                space-x-2 space-y-4
            "
        >
            <input
                v-model="city"
                class="
                    text-center
                    border border-solid
                    w-8/12
                    border-grey-300
                    rounded-xl
                "
                type="text"
                placeholder="enter city here"
            />
            <input
                v-model="countryCode"
                class="
                    text-center
                    border border-solid
                    w-8/12
                    border-grey-300
                    rounded-xl
                "
                type="text"
                placeholder="enter country code here"
            />
            <div
                class="
                    conditional-input
                    flex flex-col
                    justify-center
                    items-center
                "
            >
                <div>Do you want to use your own openweatherdata api key?</div>
                <input
                    v-model="useOwnApiKey"
                    class="
                        text-center
                        border border-solid
                        w-8/12
                        border-grey-300
                        rounded-xl
                    "
                    type="checkbox"
                />
                <input
                    v-if="useOwnApiKey"
                    v-model="usersOwnApiKey"
                    class="
                        text-center
                        border border-solid
                        w-8/12
                        border-grey-300
                        rounded-xl
                    "
                    type="text"
                    placeholder="enter your api key here"
                />
            </div>
            <div
                class="
                    conditional-input
                    flex flex-col
                    justify-center
                    items-center
                "
            >
                <div>Is your location in the united states?</div>
                <input
                    v-model="searchInUS"
                    class="
                        text-center
                        border border-solid
                        w-8/12
                        border-grey-300
                        rounded-xl
                    "
                    type="checkbox"
                />
                <input
                    v-if="searchInUS"
                    v-model="stateCode"
                    class="
                        text-center
                        border border-solid
                        w-8/12
                        border-grey-300
                        rounded-xl
                    "
                    type="text"
                    placeholder="enter state code here"
                />
            </div>
            <button
                class="
                    send-location-request
                    items-center
                    border border-solid
                    bg-gray-100
                    rounded-xl
                    w-40
                    mt-2
                "
                @click="fetchApi"
            >
                Get weather!
            </button>
        </div>

        <weather-box
            :weather-data="weatherData"
            @toggle-hourly="toggleHourly"
            @toggle-daily="toggleDaily"
        />
        <hourly-weather-card
            v-if="hourly"
            :weather-data="hourlyWeather"
        ></hourly-weather-card>
        <daily-weather-card
            v-if="daily"
            :weather-data="dailyWeather"
        ></daily-weather-card>
    </div>
</template>

<script lang="ts">
import { TYPE, POSITION } from "vue-toastification";
// function imports
import { Component, Vue } from "nuxt-property-decorator";
// component imports
import WeatherBox from "~/components/WeatherBox.vue";
import HourlyWeatherCard from "~/components/HourlyWeatherCard.vue";
import DailyWeatherCard from "~/components/DailyWeatherCard.vue";
// type and interface imports
import { WeatherResponse } from "~/types/weather";
import TestComponent from "../components/TestComponent.vue";

@Component({
    name: "LandingPage",
    components: {
        WeatherBox,
        HourlyWeatherCard,
        DailyWeatherCard,
        TestComponent,
    },
})
export default class LandingPage extends Vue {
    city: string = "";
    stateCode: string = "";
    countryCode: string = "";
    usersOwnApiKey: string = "";
    weatherData: WeatherResponse | null = null;
    // determines whether the hourly data will be displayed
    hourly: boolean = false;
    // determines whether the daily data will be displayed
    daily: boolean = false;
    // determines whether the we will check for weather inside the united states
    searchInUS: boolean = false;
    // determines whether the user will use his own api key
    useOwnApiKey: boolean = false;

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
     * @description Validates all user input boxes. MAYBE(Pierre): Validate
     * against iso standard. For now just validate against empty string.
     */
    validateInput() {
        if (this.city === "") {
            this.$toast(
                "Please insert a correct city name!\nExamples: Berlin,London,Paris",
                {
                    type: TYPE.ERROR,
                    position: POSITION.BOTTOM_CENTER,
                    bodyClassName: "text-center",
                }
            );
            return false;
        }
        if (this.countryCode === "") {
            this.$toast(
                "Please insert a correct country code in ISO 3166-1 format!\nExamples: DE,FR,US",
                {
                    type: TYPE.ERROR,
                    position: POSITION.BOTTOM_CENTER,
                    bodyClassName: "text-center",
                }
            );
            return false;
        }
        if (this.searchInUS && this.stateCode === "") {
            this.$toast(
                "Please insert a correct state code in ISO 3166-1 format!\nExamples: US-NY,US-MA,US-TX",
                {
                    type: TYPE.ERROR,
                    position: POSITION.BOTTOM_CENTER,
                    bodyClassName: "text-center",
                }
            );
            return false;
        }
        return true;
    }

    async fetchApi() {
        if (this.validateInput()) {
            try {
                const locationData = this.searchInUS
                    ? `${this.city},${this.stateCode},${this.countryCode}`
                    : `${this.city},${this.countryCode}`;
                const params = {
                    params: { q: locationData, appId: this.usersOwnApiKey },
                };
                const result = await this.$axios.get("/api/weather", params);
                this.weatherData = result.data;
            } catch (e) {
                this.$toast("Got an error calling the weather api.");
            }
        }
    }
}
</script>

<style scoped></style>
