<template>
    <!--
    @author Pierre Dahmani
    @created 01.09.2021
    @file Container for weather boxes. One weather box contains data for a
given location.
-->
    <div class="flex flex-col items-center justify-center w-full">
        <!-- HOURLY BOXES -->
        <base-button
            v-show="!displayHourly && haveHourlyData"
            class="mt-2"
            @click="displayHourly = !displayHourly"
        >
            {{ $t("displayHourlyForecastBoxes") }}
        </base-button>
        <template v-for="(item, index) in hourlyWeatherData">
            <base-space
                v-if="index !== 0"
                v-show="displayHourly"
                :key="`hourly-box-${index}`"
                :classes="`w-full mt-2`"
            />
            <!-- MAYBE(pierre): compare speed difference for v-show and v-if. for -->
            <!-- this case (toggle often) v-show should be superior I guess. -->
            <weather-box
                v-show="displayHourly"
                :key="`hourly-box-${index}-${hourlyWeatherData.dt}`"
                :weather-data="item"
                :city="city"
                :type="hourlyType"
            />
        </template>
        <base-button
            v-show="displayHourly && haveHourlyData"
            class="mt-2"
            @click="displayHourly = !displayHourly"
            >{{ $t("hideHourlyForecastBoxes") }}</base-button
        >
    </div>
</template>

<script lang="ts">
// function imports
import { Component, Vue, Prop } from "nuxt-property-decorator";
// component imports
import WeatherBox from "~/components/WeatherBox.vue";
import BaseSpace from "~/components/base/Space.vue";
// type and interface imports
import { Current, Daily } from "~/types/weather";
import { WeatherBoxType } from "~/types/weather-non-api";

@Component({
    name: "WeatherBoxes",
    components: { WeatherBox, BaseSpace },
})
export default class WeatherBoxes extends Vue {
    /**
     * @description Data which will be used to display the weather boxes.
     * The amount of boxes is determined by the length of the input array.
     */
    @Prop() hourlyWeatherData!: Current[] | null;
    @Prop() dailyWeatherData!: Daily[] | null;
    // gets city seperately since it is not part of the api data we receive.
    @Prop() city!: String | null;
    /**
     * @description Determines whether hourly forecast boxes will be displayed
     * on initial render. If this is false a button "show hourly forecast" will
     * be shown instead.
     */
    @Prop({ default: true }) defaultDisplayHourly!: boolean;
    /**
     * @description Determines whether daily forecast boxes will be displayed
     * on initial render. If this is false a button "show daily forecast" will
     * be shown instead.
     */
    @Prop({ default: true }) defaultDisplayDaily!: boolean;

    // create data attributes for props to stick to one way data flow
    // src: https://vuejs.org/v2/guide/components-props.html#One-Way-Data-Flow
    displayDaily: boolean = this.defaultDisplayDaily;
    displayHourly: boolean = this.defaultDisplayHourly;

    get haveHourlyData() {
        return this.hourlyWeatherData !== null;
    }

    get haveDailyData() {
        return this.dailyWeatherData !== null;
    }

    get hourlyType() {
        return WeatherBoxType.Hourly;
    }

    get dailyType() {
        return WeatherBoxType.Daily;
    }
}
</script>

<style scoped></style>

<i18n>
{
  "en": {
    "displayHourlyForecastBoxes": "show hourly forecast",
    "hideHourlyForecastBoxes": "hide hourly forecast",
    "displayDailyForecastBoxes": "show daily forecast",
    "hideDailyForecastBoxes": "hide daily forecast",
    "daily": "daily"
  }
}
</i18n>
