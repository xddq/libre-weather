<template>
    <div>
        <div
            class="
                flex flex-col
                items-center
                justify-center
                w-full
                mt-4
                location-input
                space-x-2
            "
        >
            <input
                class="
                    text-center
                    border border-solid
                    w-8/12
                    border-grey-300
                    rounded-xl
                "
                type="text"
                placeholder="enter your city here"
            />
            <button
                class="
                    send-location-request
                    items-center
                    border border-solid
                    bg-gray-100
                    rounded-xl
                    w-40
                    mt-2
                "
            >
                Get weather!
            </button>
        </div>

        <div
            class="
                mt-4
                flex
                justify-center
                items-center
                border border-green-50
                bg-green-50
                w-full
            "
        >
            <div class="results flex flex-col items-center justify-center">
                <div class="caption">Results</div>
                <div class="result">
                    <pre>test.</pre>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class extends Vue {
    hello() {
        const x = 10;
        return "hi";
    }
}
</script>

<style scoped></style>
