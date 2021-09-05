<script lang="ts">
// function imports
import { Component, Prop } from "nuxt-property-decorator";
import { Mixins } from "vue-property-decorator";
import { Bar, mixins } from "vue-chartjs";
// component imports
// type and interface imports

@Component({
    extends: Bar, // this is important to add the functionality to your component
    mixins: [mixins.reactiveProp],
})
export default class HourlyWeatherChart extends Mixins(
    mixins.reactiveProp,
    Bar
) {
    @Prop({ type: Object, default: null }) chartData: Object | null;
    @Prop({ type: Object, default: null }) chartOptions: Object | null;

    mounted() {
        // console.log("options:", this.chartOptions);
        // console.log("data:", this.chartData);
        // Overwriting base render method with actual data.
        this.renderChart(this.chartData, this.chartOptions);
    }
}
</script>
