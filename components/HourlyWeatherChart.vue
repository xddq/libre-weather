<script lang="ts">
// function imports
import { Mixins } from "vue-property-decorator";
import { Bar, mixins } from "vue-chartjs";
import { Component, Prop } from "nuxt-property-decorator";
// component imports
// type and interface imports
import { Current } from "~/types/Weather";

@Component({
    extends: Bar, // this is important to add the functionality to your component
    mixins: [mixins.reactiveProp],
})
export default class TestChart extends Mixins(mixins.reactiveProp, Bar) {
    /**
     * @description All required weather data which is used to display the
     * informations. Will be passed to the child component.
     */
    @Prop() weatherData!: Current[];

    get hours(): string[] {
        return this.weatherData
            .map((dataPoint) =>
                new Date(dataPoint.dt * 1000).toLocaleTimeString("de-DE", {
                    hour: "2-digit",
                })
            )
            .slice(0, 10);
    }

    get temperatures(): number[] {
        return this.weatherData.map((dataPoint) => dataPoint.temp).slice(0, 10);
    }

    mounted() {
        // Overwriting base render method with actual data.
        this.renderChart({
            labels: this.hours,
            datasets: [
                {
                    label: this.$t("hourlyData"),
                    backgroundColor: "#f87979",
                    data: this.temperatures,
                },
            ],
        });
    }
}
</script>

<style scoped></style>

<i18n>
{
  "en": {
    "hourlyData": "hourly temperature"
  }
}
</i18n>
