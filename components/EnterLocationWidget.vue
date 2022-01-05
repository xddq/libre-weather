<template>
    <div>
        <div
            v-show="enterLocation"
            class="
                location-input
                flex flex-col
                items-center
                justify-center
                w-full
                mt-4
                space-x-2 space-y-4
            "
        >
            <input
                v-model="city"
                class="
                    text-center
                    border border-solid
                    w-8/12
                    border-grey-300
                    rounded-xl
                "
                type="text"
                placeholder="enter city here"
            />
            <input
                v-model="countryCode"
                class="
                    text-center
                    border border-solid
                    bg-white
                    w-8/12
                    rounded-xl
                "
                type="text"
                placeholder="enter country code here"
            />
            <div
                class="
                    conditional-input
                    flex flex-col
                    justify-center
                    items-center
                "
            >
                <div>Do you want to use your own openweatherdata api key?</div>
                <input
                    v-model="useOwnApiKey"
                    class="
                        text-center
                        border border-solid
                        w-8/12
                        border-grey-300
                        rounded-xl
                    "
                    type="checkbox"
                />
                <input
                    v-if="useOwnApiKey"
                    v-model="usersOwnApiKey"
                    class="
                        text-center
                        border border-solid
                        w-8/12
                        border-grey-300
                        rounded-xl
                    "
                    type="text"
                    placeholder="enter your api key here"
                />
            </div>
            <div
                class="
                    conditional-input
                    flex flex-col
                    justify-center
                    items-center
                "
            >
                <div>Is your location in the united states?</div>
                <input
                    v-model="searchInUS"
                    class="
                        text-center
                        border border-solid
                        w-8/12
                        border-grey-300
                        rounded-xl
                    "
                    type="checkbox"
                />
                <input
                    v-if="searchInUS"
                    v-model="stateCode"
                    class="
                        text-center
                        border border-solid
                        w-8/12
                        border-grey-300
                        rounded-xl
                    "
                    type="text"
                    placeholder="enter state code here"
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
// component imports
// type and interface imports
import { TYPE, POSITION } from "vue-toastification";

@Component({ name: "EnterLocationWidget", components: {} })
export default class LocationWidget extends Vue {
    @Prop({ default: true }) enterLocation!: boolean;
    // decides whether we display the loading spinner.
    @Prop({ default: false }) displayLoading!: boolean;
    // determines whether the we will check for weather inside the united states
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
                ? `${this.city},${this.stateCode},${this.countryCode}`
                : `${this.city},${this.countryCode}`;
            const params = {
                params: { q: locationData, appId: this.usersOwnApiKey },
            };
            this.$emit("evaluateSearch", params);
        }
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
