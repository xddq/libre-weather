<script lang="ts">
// function imports
import { Mixins } from "vue-property-decorator";
import { Bar, mixins } from "vue-chartjs";
import { Component } from "nuxt-property-decorator";
// component imports
// type and interface imports

@Component({
    extends: Bar, // this is important to add the functionality to your component
    mixins: [mixins.reactiveProp],
})
export default class TestChart extends Mixins(mixins.reactiveProp, Bar) {
    mounted() {
        // Overwriting base render method with actual data.
        this.renderChart(this.chartData, this.chartOptions);
    }
}
</script>
