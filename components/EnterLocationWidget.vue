<template>
    <div class="px-2">
        <div
            v-show="enterLocation"
            class="
                location-input
                flex flex-col
                items-center
                justify-center
                w-full
                mt-4
                px-2
                py-4
                space-y-4
                bg-blue-500
                rounded-2xl
            "
        >
            <input
                v-model="city"
                class="
                    text-center
                    w-10/12
                    text-white
                    placeholder-white
                    rounded-xl
                    bg-blue-300
                "
                type="text"
                placeholder="enter city here"
            />
            <input
                v-model="countryCode"
                class="
                    text-center
                    w-10/12
                    text-white
                    placeholder-white
                    rounded-xl
                    bg-blue-300
                "
                type="text"
                placeholder="enter country code here"
            />
            <!-- TODO(pierre): make this a component with v-model binding of relevant -->
            <!-- attributes and reuse. -->
            <div
                class="checkbox-input flex flex-col justify-center items-center"
            >
                <div class="flex items-center justify-center">
                    <input
                        v-model="useOwnApiKey"
                        class="
                            mx-2
                            text-center
                            border border-solid border-grey-300
                            rounded-xl
                        "
                        type="checkbox"
                    />
                    <div>
                        Do you want to use your own openweatherdata api key?
                    </div>
                </div>
                <input
                    v-if="useOwnApiKey"
                    v-model="usersOwnApiKey"
                    class="
                        mt-2
                        text-center text-white
                        placeholder-white
                        rounded-xl
                        bg-blue-300
                    "
                    type="text"
                    placeholder="enter your api key here"
                />
            </div>
            <!-- TODO(pierre): make this a component with v-model binding of relevant -->
            <!-- attributes and reuse. -->
            <div
                class="checkbox-input flex flex-col justify-center items-center"
            >
                <div class="flex items-center justify-center">
                    <input
                        v-model="searchInUS"
                        class="
                            mx-2
                            text-center
                            border border-solid border-grey-300
                            rounded-xl
                        "
                        type="checkbox"
                    />
                    <div>Is your location in the united states?</div>
                </div>
                <input
                    v-if="searchInUS"
                    v-model="stateCode"
                    class="
                        mt-2
                        text-center text-white
                        placeholder-white
                        rounded-xl
                        bg-blue-300
                    "
                    type="text"
                    placeholder="enter your state code here"
                />
            </div>
            <div class="flex justify-center items-center space-x-4">
                <base-button
                    class="send-location-request"
                    @click="evaluateSearch"
                >
                    Go!
                </base-button>
                <base-button
                    class="hide-send-location-request"
                    @click="enterLocation = false"
                >
                    Hide
                </base-button>
            </div>
        </div>
        <div v-show="!enterLocation">
            <base-button
                class="
                    change-location
                    mt-10
                    flex flex-col
                    items-center
                    justify-center
                    w-full
                "
                :width="`w-40`"
                @click="enterLocation = true"
                >set location
            </base-button>
        </div>
        <FullScreenLoadingSpinner v-show="displayLoading" />
    </div>
</template>

<script lang="ts">
// function imports
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { getCookieValue, setCookie } from "~/utils/cookies";
// component imports
// type and interface imports
import { TYPE, POSITION } from "vue-toastification";
import { LastSearchCookieNames } from "~/types/cookie";

@Component({ name: "EnterLocationWidget", components: {} })
export default class LocationWidget extends Vue {
    @Prop({ default: true }) enterLocation!: boolean;
    // decides whether we display the loading spinner.
    @Prop({ default: false }) displayLoading!: boolean;
    // determines whether we will check for weather inside the united states
    searchInUS: boolean = false;
    // determines whether the user will use his own api key
    useOwnApiKey: boolean = false;
    city: string = "";
    stateCode: string = "";
    countryCode: string = "";
    usersOwnApiKey: string = "";

    /**
     * Signalizes parent component that we want to evaluate the given input.
     * Passes required params to make the api request.
     */
    evaluateSearch() {
        if (this.validateInput()) {
            const locationData = this.searchInUS
                ? `${this.city},${this.countryCode},${this.stateCode}`
                : `${this.city},${this.countryCode}`;

            const params = {
                params: {
                    q: locationData,
                    appId: this.usersOwnApiKey,
                },
            };
            // stores last searched location inside cookies.
            this.storeLastSearch();
            this.$emit("evaluateSearch", params);
        }
    }

    /**
     * @description Stores the data was was used for the last search inside
     * cookies.
     */
    storeLastSearch() {
        setCookie(LastSearchCookieNames.city, this.city);
        setCookie(LastSearchCookieNames.countryCode, this.countryCode);
        setCookie(LastSearchCookieNames.stateCode, this.stateCode);
        setCookie(LastSearchCookieNames.usersOwnApiKey, this.usersOwnApiKey);
    }

    /**
     * @description Loads default values (the last search) into the widget.
     */
    loadLastSearch() {
        this.city = getCookieValue(LastSearchCookieNames.city) ?? "";
        this.countryCode =
            getCookieValue(LastSearchCookieNames.countryCode) ?? "";
        const lastOwnApiKey = getCookieValue(
            LastSearchCookieNames.usersOwnApiKey
        );
        if (lastOwnApiKey !== null) {
            this.useOwnApiKey = true;
            this.usersOwnApiKey = lastOwnApiKey;
        }
        const lastStateCode = getCookieValue(LastSearchCookieNames.stateCode);
        if (lastStateCode !== null) {
            this.searchInUS = true;
            this.stateCode = lastStateCode;
        }
    }

    mounted() {
        this.loadLastSearch();
    }

    /**
     * @description Validates all user input boxes. MAYBE(Pierre): Validate
     * against iso standard. For now just validate against empty string.
     */
    validateInput() {
        if (this.city === "") {
            this.$toast(
                "Please insert a correct city name!\nExamples: Berlin,London,Paris",
                {
                    type: TYPE.ERROR,
                    position: POSITION.BOTTOM_CENTER,
                    bodyClassName: "text-center",
                }
            );
            return false;
        }
        if (this.countryCode === "") {
            this.$toast(
                "Please insert a correct country code in ISO 3166-1 format!\nExamples: DE,FR,US",
                {
                    type: TYPE.ERROR,
                    position: POSITION.BOTTOM_CENTER,
                    bodyClassName: "text-center",
                }
            );
            return false;
        }
        if (this.searchInUS && this.stateCode === "") {
            this.$toast(
                "Please insert a correct state code in ISO 3166-1 format!\nExamples: US-NY,US-MA,US-TX",
                {
                    type: TYPE.ERROR,
                    position: POSITION.BOTTOM_CENTER,
                    bodyClassName: "text-center",
                }
            );
            return false;
        }
        return true;
    }
}
</script>
<style scoped></style>
