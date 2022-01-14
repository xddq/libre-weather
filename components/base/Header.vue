<template>
    <!--
    @author: Pierre Dahmani
    @created: 18.08.2021
    @file: Default header for every page
-->
    <div class="flex justify-center items-center w-full mt-8">
        <nuxt-link to="/">
            <h1 class="font-semibold text-xl">Libre Weather</h1>
        </nuxt-link>
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
