<template>
    <!--
    @author: Pierre Dahmani
    @created: 18.08.2021
    @file: Default footer for every page
-->
    <footer class="flex justify-center items-center w-full mt-8 rounded-xl">
        <a href="https://www.github.com/pierrefha/libre-weather">{{
            $t("sourceCode")
        }}</a>
        <a :href="$config.GdprUrl">{{ $t("gdpr") }}</a>
        <a :href="$config.ImprintUrl">{{ $t("imprint") }}</a>
{{ link }}
    </footer>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
    name: "BaseFooter",
})
export default class BaseFooter extends Vue {
    get link() {
        return process.env;
    }
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

