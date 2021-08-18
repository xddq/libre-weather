<template>
    <div>
        <div
            class="
                flex
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
                    w-80
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
                "
            >
                Get weather!
            </button>
        </div>

        class="border border-red-300 w-96"
        <div class="results">
            Results:
            <pre>test.</pre>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>
