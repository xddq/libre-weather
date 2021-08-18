<template>
    <!-- @file Default layout for every page -->
    <div>
        <BaseHeader />
        <Nuxt />
        <BaseFooter />
    </div>
</template>

<script lang="ts">
import BaseHeader from "@/components/BaseHeader.vue";
import BaseFooter from "@/components/BaseHeader.vue";
import Vue from "vue";

export default Vue.extend({ components: { BaseHeader, BaseFooter } });
</script>
