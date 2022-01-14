<template>
    <div>
        <!-- @file Default layout for every page -->
        <div
            class="flex flex-col justify-center items-center max-w-5xl mx-auto"
        >
            <base-header />
            <Nuxt />
            <base-footer
                class="
                    border-t-2 border-white
                    flex flex-col
                    justify-center
                    items-center
                    w-full
                    text-white
                    p-2
                    mt-8
                "
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import BaseHeader from "@/components/base/Header.vue";
import BaseFooter from "@/components/base/Footer.vue";
import LoadingSpinner from "~/components/LoadingSpinner.vue";

@Component({
    name: "DefaultLayout",
    components: {
        BaseHeader,
        BaseFooter,
        LoadingSpinner,
    },
})
export default class DefaultLayout extends Vue {
    // somehow needed this to set the background color of the whole body.
    // src: https://stackoverflow.com/questions/57148756/changing-the-body-background-dynamically-with-vue
    mounted() {
        const color = "bg-blue-300";
        document.body.className = color;
    }
}
</script>

<style scoped>
/* Modal Content/Box */
.modal {
    transform: translate(-50%, -50%);
}
</style>
