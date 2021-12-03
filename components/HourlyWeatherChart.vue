<script lang="ts">
// function imports
import { Component, Prop } from "nuxt-property-decorator";
import { Mixins } from "vue-property-decorator";
import { Line, mixins } from "vue-chartjs";
// component imports
// type and interface imports

@Component({
    extends: Line, // this is important to add the functionality to your component
    mixins: [mixins.reactiveProp],
})
export default class HourlyWeatherChart extends Mixins(
    mixins.reactiveProp,
    Line
) {
    /**
     * @description Data for the chart.js object. Contains the temperatures and
     * their specific timestamps.
     */
    @Prop({ type: Object, default: null }) chartData!: Chart.ChartData;
    /**
     * @description Options for the chart.js object. See chart.js docu.
     */
    @Prop({ type: Object, default: null }) chartOptions!: Chart.ChartOptions;
    /**
     * @description Images which will placed above each data point. Displaying the
     * current weather situation.
     */
    @Prop({ type: Array, default: [] }) chartTickImages!: string[];

    mounted() {
        // NOTE(pierre): chartjs 2.X seems not to have decent types for plugins
        // (object :D). Stop trying and mostly just skip ts here.  drawing src:
        // https://stackoverflow.com/questions/30247579/how-to-add-an-images-as-labels-to-canvas-charts-using-chart-js
        this.addPlugin({
            id: "add-images",
            afterDraw: (chart: any) => {
                const ctx: CanvasRenderingContext2D = chart.chart.ctx;
                const xAxis = chart.scales["x-axis-0"];
                const yAxis = chart.scales["y-axis-0"];

                xAxis.ticks.forEach((_: any, index: number) => {
                    const x = xAxis.getPixelForTick(index);
                    const image = new Image();
                    image.src = this.chartTickImages[index];
                    /* NOTE(pierre): I have no clue why and how this places the
                     * images onto the correct position (even when resizing the
                     * chart). Figured this out by testing and checking
                     * attributes of the chart object.
                     */
                    ctx.drawImage(
                        image,
                        x - xAxis._startPixel + 32,
                        yAxis.top - 40
                    );
                });
            },
        });

        // Overwriting base render method with actual data.
        this.renderChart(this.chartData, this.chartOptions);
    }
}
</script>
