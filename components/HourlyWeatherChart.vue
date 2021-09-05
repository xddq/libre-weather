<script lang="ts">
// function imports
import { Component, Prop } from "nuxt-property-decorator";
import { Mixins } from "vue-property-decorator";
import { Bar, mixins } from "vue-chartjs";
// component imports
// type and interface imports
import { Chart } from "chart.js";

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

    get images() {
        const validImgSrc = "01d.png";
        const images = [...Array(20)].map(() => validImgSrc);
        console.log("images: ", images);
        return images;
    }

    mounted() {
        // NOTE(pierre): chartjs 2.X seems to not have types for this plugin
        // stuff. Skip ts here.
        // drawing src: https://stackoverflow.com/questions/30247579/how-to-add-an-images-as-labels-to-canvas-charts-using-chart-js
        this.addPlugin({
            id: "add-images",
            afterDraw: (chart) => {
                const ctx: CanvasRenderingContext2D = chart.chart.ctx;
                const xAxis = chart.scales["x-axis-0"];
                const yAxis = chart.scales["y-axis-0"];

                // expects stepsize to be equal for all data points.
                const stepSize =
                    xAxis.getPixelForTick(1) - xAxis.getPixelForTick(0);
                const middle = (xAxis, point: number) =>
                    xAxis.getPixelForTick(point) - stepSize * 0.5;
                // const startPixel = xAxis._startPixel;

                const scale = this.scale;
                console.log("scale: ", scale);

                xAxis.ticks.forEach((_, index) => {
                    const x = middle(xAxis, index);
                    const image = new Image();
                    image.src = this.images[index];
                    ctx.drawImage(image, x, yAxis.bottom - 20);
                });
            },
        });

        // Overwriting base render method with actual data.
        this.renderChart(this.chartData, this.chartOptions);
    }
}
</script>
