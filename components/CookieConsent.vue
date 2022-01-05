<template>
    <!--
    @author Pierre Dahmani
    @created 02.09.2021
    @file Component which is used for cookie consent. Put this inside your
layout to get global cookie consent.
-->
    <div
        v-show="!accepted"
        class="
            modal-overlay
            fixed
            top-0
            bottom-0
            left-0
            right-0
            flex
            justify-center
            items-center
            bg-gray-600
        "
    >
        <div
            class="
                modal
                flex flex-col
                md:flex-row
                items-center
                justify-center
                bg-white
                md:w-8/12 md:h-1/5
                rounded-2xl
                p-4
            "
        >
            <div
                class="
                    cookie-icon
                    flex
                    items-center
                    justify-center
                    md:w-1/12 md:mr-2
                "
            >
                <icon-cookie class="w-32 h-32 icon"></icon-cookie>
            </div>
            <div
                class="
                    flex
                    items-center
                    justify-center
                    explanation
                    md:w-7/12
                    mr-10
                "
            >
                <div class="text">
                    This website uses cookies only to enable essential site
                    functionality.
                    <a
                        class="text-blue-500 hover:text-blue-400"
                        href="https://www.cookiesandyou.com/"
                        >Learn about cookies.</a
                    >
                </div>
            </div>
            <div
                class="
                    actions
                    flex flex-col
                    pt-4
                    md:pt-0
                    justify-center
                    items-center
                "
            >
                <base-button @click="accept">Got it</base-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
// function imports
import { Component, Vue, Prop } from "nuxt-property-decorator";
// component imports
import BaseButton from "@/components/base/button.vue";
import IconCookie from "@/components/icon/Cookie.vue";
// type and interface imports

@Component({ name: "CookieConsent", components: { BaseButton, IconCookie } })
export default class CookieConsent extends Vue {
    @Prop() hello!: null;
    accepted: Boolean = false;

    // return value of empty string indicates that cookie is not set yet.
    // sample from here: https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
    getCookieValue(name: string) {
        const cookie = document.cookie;
        const cookieValue = cookie
            ?.split("; ")
            ?.find((row) => row.startsWith(name))
            ?.split("=")[1];
        return cookieValue;
    }

    accept() {
        document.cookie = "cookiesAccepted=true; Secure";
        this.accepted = true;
    }

    mounted() {
        this.accepted = this.getCookieValue("cookiesAccepted") === "true";
    }
}
</script>
<style scoped></style>
