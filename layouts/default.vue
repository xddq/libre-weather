<template>
    <!-- @file Default layout for every page -->
    <div>
        <BaseHeader />
        <Nuxt />
        <BaseFooter />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import BaseHeader from "@/components/BaseHeader.vue";
import BaseFooter from "@/components/BaseFooter.vue";

@Component({
    name: "DefaultLayout",
    components: {
        BaseHeader,
        BaseFooter,
    },
})
export default class DefaultLayout extends Vue {}
</script>

<style scoped></style>
