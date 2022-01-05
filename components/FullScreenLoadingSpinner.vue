<template>
    <!-- @file Displays loading spinner in the middle of the screen while
covering everything else with a transparent background.-->
    <div>
        <!-- Modal -->
        <div
            class="
                modal-overlay
                fixed
                top-0
                bottom-0
                left-0
                right-0
                flex
                justify-center
                items-center
                bg-gray-400
                opacity-50
            "
        >
            <LoadingSpinner class="modal-content fixed z-1 h-auto" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
    name: "FullScreanLoadingSpinner",
})
export default class FullScreanLoadingSpinner extends Vue {}
</script>

<style scoped>
/* Modal Content/Box */
.modal {
    transform: translate(-50%, -50%);
}
</style>
