<template>
    <!--
    @author Pierre Dahmani
    @created 02.09.2021
    @file Displays weather data for a given location.
-->
    <div class="flex flex-col text-xl text-white w-full">
        <div
            v-if="weatherDataNotNull"
            class="
                weather-widget
                flex flex-col
                w-full
                bg-blue-400
                rounded-xl
                shadow-md
                p-2
            "
        >
            <div class="flex justify-center items-center">
                <div class="flex items-center justify-center w-2/3">
                    {{ location | capitalize }}
                </div>
                <div class="flex items-center justify-center w-1/3">
                    {{ time }}
                </div>
            </div>
            <div class="image-and-main-infos-beside flex w-full">
                <div
                    class="
                        icon-description
                        flex flex-col
                        w-1/3
                        h-32
                        items-center
                        justify-center
                    "
                >
                    <div
                        class="
                            icon
                            flex
                            w-full
                            items-center
                            justify-center
                            text-center
                            h-2/3
                        "
                    >
                        <img
                            :src="icon"
                            alt="`picture of ${description}`"
                            class=""
                        />
                    </div>
                    <div
                        class="
                            description
                            flex
                            justify-center
                            items-center
                            w-full
                            text-center
                            overflow-hidden
                            h-1/3
                        "
                    >
                        {{ description }}
                    </div>
                </div>
                <div
                    class="
                        text-info-weather
                        flex flex-col
                        justif-center
                        items-center
                        w-2/3
                        h-auto
                        mt-2
                    "
                >
                    <div class="row flex w-full justify-center items-center">
                        <Thermometer class="text-white fill-current mr-2" />
                        <div class="text-center">
                            {{ temperature }} {{ temperatureUnit }}
                        </div>
                    </div>
                    <div class="row flex w-full justify-center items-center">
                        <Wind class="text-gray-200 stroke-2 mr-2" />
                        <div class="text-center">
                            {{ windSpeed }} {{ windUnit }}
                        </div>
                    </div>
                    <div class="row flex w-full justify-center items-center">
                        <!-- can style svgs by using text and background color. -->
                        <!-- for more: https://www.geeksforgeeks.org/how-to-change-svg-icon-colors-with-tailwind-css/ -->
                        <Umbrella class="text-blue-600 stroke-2 mr-2" />
                        <div
                            class="
                                text-blue-600
                                value
                                flex
                                justify-center
                                items-center
                            "
                        >
                            {{ riskOfRain }}%
                        </div>
                    </div>
                    <div class="row flex w-full justify-center items-center">
                        <div class="text-center">
                            {{ pressure }} {{ pressureUnit }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
// function imports
import { Component, Vue, Prop } from "nuxt-property-decorator";
// component imports
import Umbrella from "~/components/icon/Umbrella.vue";
import Wind from "~/components/icon/Wind.vue";
import Thermometer from "~/components/icon/Thermometer.vue";
// type and interface imports
import { WeatherResponse } from "~/types/weather";

@Component({
    name: "WeatherBox",
    components: {
        Umbrella,
        Wind,
        Thermometer,
    },
    // https://stackoverflow.com/questions/52823903/how-do-i-define-a-filter-in-a-vue-class-component
    filters: {
        capitalize(value: any) {
            if (!value) return "";
            value = value.toString();
            return value.charAt(0).toUpperCase() + value.slice(1);
        },
    },
})
export default class WeatherBox extends Vue {
    /**
     * @description All required weather data which is used to display the
     * informations.
     */
    @Prop() weatherData!: WeatherResponse | null;
    /**
     * @description Flag that determines whether the "hourly" and "weekly"
     * buttons will be shown. Should also be shown in the initial/main weather
     * box.
     */
    @Prop({ default: true }) mainCard!: boolean;

    get weatherDataNotNull() {
        return this.weatherData !== null;
    }

    get icon() {
        if (this.weatherData === null) {
            return "";
        }
        return `${this.weatherData.current.weather[0].icon}.png`;
    }

    get description() {
        return this.weatherData?.current?.weather[0].description ?? "";
    }

    get date() {
        if (this.weatherData === null) {
            return "";
        }
        const currentDate = new Date(this.weatherData.current.dt * 1000);
        return currentDate.toLocaleDateString("de-DE");
    }

    get time() {
        if (this.weatherData === null) {
            return "";
        }
        const currentDate = new Date(this.weatherData.current.dt * 1000);
        // TODO(pierre): maybe show am/pm with settings later.
        return currentDate.toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    get location() {
        return this.weatherData?.city ?? "";
    }

    get temperature() {
        const temperatue = this.weatherData?.current.feels_like;
        if (temperatue === undefined) {
            return "";
        }
        // only allow XX.Y displayed for degree/fahrenheit
        return temperatue.toFixed(1);
    }

    get temperatureUnit() {
        return "°C";
    }

    get windSpeed() {
        // default is speed in m/s.
        // src: https://openweathermap.org/api/hourly-forecast
        const speed = this.weatherData?.current.wind_speed;
        if (speed === undefined) {
            return "";
        }
        // return speed in km/h
        return (speed * 3.6).toString().slice(0, 3);
    }

    get windUnit() {
        return "km/h";
    }

    get riskOfRain() {
        const riskOfRain = this.weatherData?.hourly[0]?.pop;
        if (riskOfRain === undefined) {
            return "";
        }
        // risk of rain will be given in 0.XX from api. transform to XX%
        return riskOfRain * 100;
    }

    get pressure() {
        return this.weatherData?.current.pressure ?? "";
    }

    get pressureUnit() {
        return "hPa";
    }
}
</script>

<i18n>
{
  "en": {
    "wind": "wind",
    "time": "time",
    "temperature": "temperature",
    "humidity": "humidity",
    "pressure": "pressure",
    "hourly": "hourly",
    "daily": "daily"
  }
}
</i18n>

<style scoped></style>
