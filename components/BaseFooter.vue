<template>
    <!--
    @author: Pierre Dahmani
    @created: 18.08.2021
    @file: Default footer for every page
-->
    <div class="flex justify-center items-center w-full mt-8 rounded-xl">
        <footer>created by Pierre Dahmani</footer>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
    name: "BaseFooter",
})
export default class BaseFooter extends Vue {}
</script>

<style scoped></style>
