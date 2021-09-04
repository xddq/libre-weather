<template>
    <!--
    @author Pierre Dahmani
    @created 02.09.2021
    @file Displays weather data for a given location.
-->
    <div class="flex flex-col text-xl w-full px-2 pt-2">
        <div
            v-if="weatherDataNotNull"
            class="
                weather-widget
                flex flex-col
                w-full
                bg-blue-200
                rounded-xl
                shadow-md
            "
        >
            <!-- TODO(pierre): how to make this icon square?
                maybe check this: https://carlanderson.xyz/how-to-keep-your-flexbox-square/ -->
            <div class="basic-current-infos flex w-full">
                <div
                    class="
                        icon-description
                        flex flex-col
                        w-1/3
                        h-auto
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
                        icon here
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
                    "
                >
                    <div class="flex time-and-location w-full">
                        <div
                            class="
                                time
                                flex
                                w-full
                                justify-center
                                items-center
                                overflow-hidden
                                pt-1
                                pl-1
                            "
                        >
                            {{ location }}
                        </div>
                        <div
                            class="
                                city-and-state
                                flex
                                justify-center
                                items-center
                                text-center
                                pt-1
                                pr-1
                            "
                        >
                            {{ date }}
                        </div>
                    </div>
                    <div class="row flex w-full justify-center items-center">
                        <div
                            class="
                                description
                                flex
                                justify-left
                                items-center
                                w-1/2
                                pl-1
                            "
                        >
                            {{ $t("temperature") }}
                        </div>
                        <div
                            class="value flex justify-center items-center w-1/2"
                        >
                            {{ temperature }} {{ temperatureUnit }}
                        </div>
                    </div>
                    <div class="row flex w-full justify-center items-center">
                        <div
                            class="
                                description
                                flex
                                justify-left
                                items-center
                                w-1/2
                                pl-1
                            "
                        >
                            {{ $t("time") }}
                        </div>
                        <div
                            class="value flex justify-center items-center w-1/2"
                        >
                            {{ time }}
                        </div>
                    </div>
                    <div class="row flex w-full justify-center items-center">
                        <div
                            class="
                                description
                                flex
                                justify-left
                                items-center
                                w-1/2
                                pl-1
                            "
                        >
                            {{ $t("wind") }}
                        </div>
                        <div
                            class="value flex justify-center items-center w-1/2"
                        >
                            {{ windSpeed }} {{ windUnit }}
                        </div>
                    </div>
                    <div class="row flex w-full justify-center items-center">
                        <div
                            class="
                                description
                                flex
                                justify-left
                                items-center
                                w-1/2
                                pl-1
                            "
                        >
                            {{ $t("humidity") }}
                        </div>
                        <div
                            class="value flex justify-center items-center w-1/2"
                        >
                            {{ humidity }} {{ humidityUnit }}
                        </div>
                    </div>
                    <div class="row flex w-full justify-center items-center">
                        <div
                            class="
                                description
                                flex
                                justify-left
                                items-center
                                w-1/2
                                pl-1
                            "
                        >
                            {{ $t("pressure") }}
                        </div>
                        <div
                            class="value flex justify-center items-center w-1/2"
                        >
                            {{ pressure }} {{ pressureUnit }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            v-if="mainCard && weatherDataNotNull"
            class="
                hourly-and-weekly
                flex
                items-center
                justify-center
                w-full
                mt-2
            "
        >
            <div class="hourly flex justify-center items-center w-full">
                <button
                    class="
                        hourly
                        text
                        flex
                        bg-blue-400
                        hover:bg-blue-600
                        rounded-xl
                        items-center
                        justify-center
                        text-center
                        w-20
                        h-12
                    "
                    @click="$emit('toggle-hourly')"
                >
                    hourly
                </button>
            </div>
            <div class="weekly flex w-full justify-center items-center">
                <div
                    class="
                        weekly
                        text
                        flex
                        bg-blue-400
                        hover:bg-blue-600
                        rounded-xl
                        items-center
                        justify-center
                        text-center
                        w-20
                        h-12
                    "
                >
                    weekly
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
// function imports
import { Component, Vue, Prop } from "nuxt-property-decorator";
// component imports
// type and interface imports
import { WeatherResponse } from "~/types/Weather";

@Component({ name: "WeatherBox", components: {} })
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
        return this.weatherData?.current.feels_like ?? "";
    }

    get temperatureUnit() {
        return "°C";
    }

    get windSpeed() {
        return this.weatherData?.current.wind_speed ?? "";
    }

    get windUnit() {
        return "m/s";
    }

    get humidity() {
        return this.weatherData?.current.humidity ?? "";
    }

    get humidityUnit() {
        return "%";
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
    "pressure": "pressure"
  }
}
</i18n>

<style scoped></style>
