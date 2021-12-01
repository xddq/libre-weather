<template>
    <!--
    @author: Pierre Dahmani
    @created: 18.08.2021
    @file: Default header for every page
-->
    <div class="flex justify-center items-center w-full mt-8">
        <h1>Libre Weather</h1>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
    name: "BaseHeader",
})
export default class BaseHeader extends Vue {}
</script>

<style scoped></style>
