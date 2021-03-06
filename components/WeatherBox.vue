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
                        <img :src="icon" alt="description" />
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
                        <div class="text-center mr-4">
                            {{ temperature }}{{ temperatureUnit }}
                        </div>
                        <div class="flex-col flex justify-center items-center">
                            <div class="text-xs text-gray-200">feels like</div>
                            <div>{{ feelsLike }}{{ temperatureUnit }}</div>
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
import { store } from "~/weather-store/store";
import {
    celsiusToFahrenheit,
    kilometerPerHourToMilesPerHour,
    meterPerSecondToKilometerPerHour,
} from "~/utils/convert";
// component imports
import Umbrella from "~/components/icon/Umbrella.vue";
import Wind from "~/components/icon/Wind.vue";
import Thermometer from "~/components/icon/Thermometer.vue";
// type and interface imports
import { Current } from "~/types/weather";
import {
    TemperatureUnits,
    WeatherBoxType,
    WindUnits,
} from "~/types/weather-non-api";

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
    @Prop() weatherData!: Current | null;
    // gets city seperately since it is not part of the api data we receive.
    @Prop() city!: String | null;
    @Prop({ default: WeatherBoxType.Main }) type!: WeatherBoxType;

    // have to import state like this to make it reactive on all attributes.
    sharedState = store.state;
    get useImperialSystem() {
        return this.sharedState.useImperialSystem;
    }

    get weatherDataNotNull() {
        return this.weatherData !== null;
    }

    // The icons that are loaded by this function are inside ~/static/here.png
    get icon() {
        if (this.weatherData === null) {
            return "";
        }
        if (
            this.type === WeatherBoxType.Main ||
            this.type === WeatherBoxType.Hourly
        ) {
            return `${this.weatherData?.weather[0]?.icon}.png`;
        }
        // default that can not yet be reached. (can be reached once we add the
        // "daily" stuff).
        return "";
    }

    get description() {
        return this.weatherData?.weather[0]?.description ?? "";
    }

    get date() {
        if (this.weatherData === null) {
            return "";
        }
        const currentDate = new Date(this.weatherData.dt * 1000);
        return currentDate.toLocaleDateString("de-DE");
    }

    get time() {
        if (this.weatherData === null) {
            return "";
        }
        const currentDate = new Date(this.weatherData?.dt * 1000);
        // TODO(pierre): maybe show am/pm with settings later.
        return currentDate.toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    get location() {
        return this.city ?? "";
    }

    get temperature() {
        const tempInCelsius = this.weatherData?.temp;
        if (tempInCelsius === undefined) {
            return "";
        }
        if (this.useImperialSystem) {
            return celsiusToFahrenheit(tempInCelsius).toFixed(0);
        }
        return tempInCelsius.toFixed(0);
    }

    get feelsLike() {
        const tempInCelsius = this.weatherData?.feels_like;
        if (tempInCelsius === undefined) {
            return "";
        }
        if (this.useImperialSystem) {
            return celsiusToFahrenheit(tempInCelsius).toFixed(0);
        }
        return tempInCelsius.toFixed(0);
    }

    get temperatureUnit() {
        return this.useImperialSystem
            ? TemperatureUnits.Imperial
            : TemperatureUnits.Metric;
    }

    get windSpeed() {
        // speed in meter per second
        // src: https://openweathermap.org/api/hourly-forecast
        const speed = this.weatherData?.wind_speed;
        if (speed === undefined) {
            return "";
        }
        const kmh = meterPerSecondToKilometerPerHour(speed);
        if (this.useImperialSystem) {
            return kilometerPerHourToMilesPerHour(kmh).toFixed(0);
        } else {
            return kmh.toFixed(0);
        }
    }

    get windUnit() {
        return this.useImperialSystem ? WindUnits.Imperial : WindUnits.Metric;
    }

    get riskOfRain() {
        const riskOfRain = this.weatherData?.pop;
        if (riskOfRain === undefined) {
            return "";
        }
        // risk of rain will be given in 0.XX from api. transform to XX%. Using
        // toFixed since floating point arithmetic would otherwise do it's
        // things :P
        return (riskOfRain * 100).toFixed(0);
    }

    get pressure() {
        return this.weatherData?.pressure ?? "";
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
