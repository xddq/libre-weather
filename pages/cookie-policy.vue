<template>
    <!--
    @author Pierre Dahmani
    @created 14.01.2022
    @file Displays static content for the cookie policy. Here we have to
explaine the basic usage/functionality of all used cookies once.
    MAYBE(pierre): Could use .md parser (and/or nuxt content module) and have a
.md file for cookie policy.
-->
    <div class="p-4 flex flex-col justify-center items-center">
        <nuxt-link to="/">
            <back-arrow class="w-14 h-14 stroke-1" />
        </nuxt-link>
        <cookie-policy-entry
            v-for="entry in entries"
            :key="entry.name"
            :entry="entry"
            class="my-4 p-3 bg-blue-400 rounded-xl shadow-md"
        >
        </cookie-policy-entry>
        <nuxt-link to="/">
            <back-arrow class="w-14 h-14 stroke-1" />
        </nuxt-link>
    </div>
</template>

<script lang="ts">
// function imports
import { Component, Vue } from "nuxt-property-decorator";
// component imports
import CookiePolicyEntry from "~/components/CookiePolicyEntry.vue";
import BackArrow from "~/components/icon/BackArrow.vue";
// type and interface imports
import {
    CookieParty,
    CookiePolicyInput,
    LastSearchCookieNames,
} from "~/types/cookie";

export const usedCookies: CookiePolicyInput[] = [
    {
        name: LastSearchCookieNames.city,
        party: CookieParty.firstParty,
        description:
            "Stores the city that was last searched for. Is used to prefill the field in the form to increase the user experience.",
    },
    {
        name: LastSearchCookieNames.countryCode,
        party: CookieParty.firstParty,
        description:
            "Stores the country code that was last searched for. Is used to prefill the field in the form to increase the user experience.",
    },
    {
        name: LastSearchCookieNames.usersOwnApiKey,
        party: CookieParty.firstParty,
        description:
            "Stores the users own api key that was last searched for. Is used to prefill the field in the form to increase the user experience.",
    },
    {
        name: LastSearchCookieNames.stateCode,
        party: CookieParty.firstParty,
        description:
            "Stores the users own api key that was last searched for. Is used to prefill the field in the form to increase the user experience.",
    },
    {
        name: "i18n_redirected",
        party: CookieParty.firstParty,
        description:
            "Stores the users language. Is used to translate the text into the correct language to increase the user experience.",
    },
];

@Component({
    name: "CookiePolicy",
    components: { CookiePolicyEntry, BackArrow },
})
export default class CookiePolicy extends Vue {
    entries = usedCookies;
}
</script>

<style scoped></style>
