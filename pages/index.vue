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
            "
        >
            <input type="text" placeholder="enter your city here" />
            <button class="send-location-request">Get weather!</button>
        </div>

        <div class="weather-card">
            <div class="results">
                Results:
                <pre>test.</pre>
            </div>
        </div>
    </div>

import Vue from "vue";
export default Vue.extend({});
