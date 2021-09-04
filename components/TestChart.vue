<script lang="ts">
// CommitChart.ts
import { Mixins } from "vue-property-decorator";
import { Bar, mixins } from "vue-chartjs";
import { Component } from "nuxt-property-decorator";

@Component({
    extends: Bar, // this is important to add the functionality to your component
    mixins: [mixins.reactiveProp],
})
export default class TestChart extends Mixins(mixins.reactiveProp, Bar) {
    mounted() {
        // Overwriting base render method with actual data.
        this.renderChart({
            labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ],
            datasets: [
                {
                    label: "GitHub Commits",
                    backgroundColor: "#f87979",
                    data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
                },
            ],
        });
    }
}
</script>

<style scoped></style>
