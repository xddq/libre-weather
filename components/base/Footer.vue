<template>
    <!--
    @author: Pierre Dahmani
    @created: 18.08.2021
    @file: Default footer for every page
-->
    <footer >
        <div class="first-row w-full flex justify-center items-center second-row">
            <brand-github class="h-12 w-12 stroke-2"></brand-github> <a class="w-full text-center" href="https://www.github.com/xddq/libre-weather">{{
                $t("sourceCode")
            }}</a>
            <nuxt-link class="w-full text-center" to="/cookie-policy">Cookie Policy</nuxt-link>
        </div>
        <div class="flex mt-2 w-full justify-center items-center second-row">
        <a class="w-full text-center" :href="$config.GdprUrl">{{ $t("gdpr") }}</a>
        <a class="w-full text-center" :href="$config.ImprintUrl">{{ $t("imprint") }}</a>
</div>
    </footer>
</template>

<script lang="ts">
// function imports
import { Component, Vue } from "nuxt-property-decorator";
// component imports
import BrandGithub from "~/components/icon/BrandGithub.vue"
// type and interface imports

@Component({
    name: "BaseFooter",
    components: { BrandGithub}
})
export default class BaseFooter extends Vue {
}
</script>

<style scoped></style>

<i18n>
{
  "en": {
    "sourceCode": "Source code",
    "gdpr": "Privacy",
    "imprint": "Imprint"
  }
}

