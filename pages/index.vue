<template>
    <div>
        <div
            class="
                flex flex-col
                items-center
                justify-center
                w-full
                mt-4
                location-input
                space-x-2
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
                placeholder="enter your city here"
            />
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

        <weather-box :weather-data="weatherData" />
    </div>
</template>

<script lang="ts">
// function imports
import { Component, Vue } from "nuxt-property-decorator";
// component imports
import WeatherBox from "~/components/WeatherBox.vue";
// type and interface imports
import { WeatherResponse } from "~/types/Weather";

@Component({ name: "LandingPage", components: { WeatherBox } })
export default class LandingPage extends Vue {
    city: string = "";
    weatherData: WeatherResponse | undefined;

    async fetchApi() {
        try {
            const params = { params: { q: this.city } };
            const result = await this.$axios.get("/api/weather", params);
            this.weatherData = result.data;
        } catch (e) {
            // TODO(pierre). create toast message with error message.
            console.log("got an error calling weather api.");
        }
    }
}
</script>

<style scoped></style>
