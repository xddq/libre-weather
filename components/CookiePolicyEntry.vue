<template>
    <!--
    @author Pierre Dahmani
    @created 14.01.2022
    @file Displays the description for one cookie policy entry.
    src: https://www.iubenda.com/en/help/5525-cookies-gdpr-requirements
-->
    <div class="flex flex-col justify-center items-center text-white">
        <!-- TODO(pierre): figure out how to get code suggestions in vue
template with TS for vim. E.g. have no entry.name suggestions although it knows
the type...! :( -->
        <div class="caption text-gray-300">{{ $t("name") }}</div>
        <div class="value mt-1 flex justify-center items-center text-center">
            {{ entry.name }}
        </div>
        <div class="caption mt-3 text-gray-300">{{ $t("party") }}</div>
        <div class="value mt-1 flex justify-center items-center text-center">
            {{ entry.party }}
        </div>
        <div class="caption mt-3 text-gray-300">
            {{ $t("description") }}
        </div>
        <div class="value mt-1 flex justify-center items-center text-center">
            {{ entry.description }}
        </div>
    </div>
</template>

<script lang="ts">
// function imports
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { CookiePolicyInput } from "~/types/cookie";
// component imports
// type and interface imports

@Component({ name: "CookiePolicyEntry" })
export default class CookiePolicyEntry extends Vue {
    @Prop() entry!: CookiePolicyInput;
}
</script>

<style scoped></style>
<i18n>
{
  "en": {
    "name": "cookie name: ",
    "party": "cookie party: ",
    "description": "cookie description: "
  }
}
</i18n>
