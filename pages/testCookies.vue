<template>
    <div></div>
</template>

<script lang="ts">
// function imports
import { Component, Vue } from "nuxt-property-decorator";
import CookieConsent from "../components/CookieConsent.vue";
// component imports
// type and interface imports

@Component({
    name: "TestCookies",
    components: { CookieConsent },
})
export default class TestCookies extends Vue {}
</script>

<style scoped></style>
