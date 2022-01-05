<template>
    <!--
    @author: Pierre Dahmani
    @created: 05.12.2021
    @file: Testing importing js libraries as plugins into nuxt.
-->
    <div class="flex justify-center items-center w-full mt-8">
        <h1>Test Stuff! Check your console OwO</h1>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
    name: "TestComponent",
})
export default class TestComponent extends Vue {
    mounted() {
        this.$myInjectedFunction("Hello plugin world");
    }
    // will console.log 'Hello mounted!'
    // asyncData({ $hello }) {
    //     $hello("asyncData");
    // }
}
</script>

<style scoped></style>
