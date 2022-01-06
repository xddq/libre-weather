<template>
    <!--
    @author Pierre Dahmani
    @created 06.01.2022
    @file I thought of using components when we want to insert spaces will lead
        to more readable code. Just test this in this app. This is the component that
        will be used for that.
    -->
    <div :class="classes"></div>
</template>

<script lang="ts">
// function imports
import { Component, Vue, Prop } from "nuxt-property-decorator";
// component imports
// type and interface imports

@Component({ name: "BaseSpace", components: {} })
export default class Space extends Vue {
    @Prop({ default: "" }) classes!: string;
}
</script>
<style scoped></style>
