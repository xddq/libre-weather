<template>
    <!--
    @author Pierre Dahmani
    @created 02.09.2021
    @file Displays weather data for a given location.
-->
    <div class="flex flex-col w-full px-2 pt-2">
        <div class="weather-widget flex w-full">
            <!-- TODO(pierre): how to make this icon square?
                maybe check this: https://carlanderson.xyz/how-to-keep-your-flexbox-square/ -->
            <div
                class="
                    icon-description
                    flex flex-col
                    w-1/3
                    h-auto
                    border border-red-300
                "
            >
                <div class="icon border border-green-300 h-2/3">icon here</div>
                <div
                    class="
                        description
                        overflow-hidden
                        border
                        broder-green-300
                        h-1/3
                    "
                >
                    description here
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
                    border border-green-300
                "
            >
                <div
                    class="
                        city-and-state
                        flex
                        w-full
                        justify-center
                        items-center
                        text-center
                        border border-red-300
                    "
                >
                    Aachen, DE
                </div>
                <div
                    class="
                        temp
                        flex
                        w-full
                        justify-center
                        items-center
                        border border-red-300
                    "
                >
                    20°C
                </div>
                <div class="wind">Wind: 2.6m/s</div>
                <div class="humidity">Humidity: 60%</div>
                <div class="pressure">1000 hPa</div>
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

@Component
export default class WeatherBox extends Vue {
    @Prop() weatherData: WeatherResponse | undefined;
}
</script>

<style scoped></style>
