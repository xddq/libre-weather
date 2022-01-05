<template>
    <div>
        <!-- @file Default layout for every page -->
        <div
            class="flex flex-col justify-center items-center max-w-5xl mx-auto"
        >
            <BaseHeader />
            <Nuxt />
            <BaseFooter />
            <!--
https://nuxtjs.org/docs/features/nuxt-components/#the-client-only-component -->
            <client-only>
                <!-- this component will only be rendered on client-side -->
                <CookieConsent />
                <!-- loading indicator, rendered on server-side -->
                <template #placeholder>
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
                        <LoadingSpinner
                            class="modal-content fixed z-1 h-auto"
                        />
                    </div>
                </template>
            </client-only>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import BaseHeader from "@/components/BaseHeader.vue";
import BaseFooter from "@/components/BaseFooter.vue";
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
