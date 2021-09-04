<template>
    <!--
    @author Pierre Dahmani
    @created 04.09.2021
    @file Displays weatherboxes for the next X (default 8) hours (TODO(pierre): set X in
settings?
-->
    <div class="w-full flex flex-col justify-center items-center">
        <weather-box
            v-for="box in boxes"
            :key="box"
            :weather-data="weatherData"
            :main-card="false"
        ></weather-box>
    </div>
</template>

<script lang="ts">
// function imports
import { Component, Vue, Prop } from "nuxt-property-decorator";
// component imports
import WeatherBox from "~/components/WeatherBox.vue";

@Component({ name: "HourlyWeatherCard", components: { WeatherBox } })
export default class HourlyWeatherCard extends Vue {
    // TODO(pierre): replace with size :]
    boxes = [1, 2, 3];
    /**
     * @description All required weather data which is used to display the
     * informations. Will be passed to the child component.
     */
    @Prop() weatherData!: WeatherResponse | null;
}
</script>

<style scoped></style>
