<template>
    <!--
    @author Pierre Dahmani
    @created 01.09.2021
    @file Every button in this app is using this component to keep a clean
style.
-->
    <div>
        <div
            class="
                button
                h-12
                rounded-xl
                flex
                justify-center
                items-center
                text-center
            "
            :class="[bgColor, bgColorOnHover, textColor, width]"
            @click="$emit('click')"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
// function imports
import { Component, Vue, Prop } from "nuxt-property-decorator";
// component imports
// type and interface imports

@Component({ name: "BaseButton", components: {} })
export default class Button extends Vue {
    @Prop({ default: "bg-blue-400" }) bgColor!: string;
    @Prop({ default: "hover:bg-blue-500" }) bgColorOnHover!: string;
    @Prop({ default: "text-white" }) textColor!: string;
    @Prop({ default: "w-28" }) width!: string;
}
</script>
<style scoped></style>
