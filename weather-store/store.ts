/**
 *
 * Author: Pierre Dahmani
 * Created: 09.01.2022
 *
 * Description: Creates a simple store pattern for global state management.
 * See: https://vuejs.org/v2/guide/state-management.html#Simple-State-Management-from-Scratch
 */

import { WeatherUnits } from "~/types/weather-non-api";

// MAYBE(pierre): think about injecting store into $nuxt instance in a
// MAYBE(pierre): create an interface for the store.
// middleware to avoid having to import it over and over again whenever used..
export const store = {
    debug: false,
    // will contain log of every store mutation in debug mode.
    log: "",
    state: {
        useImperialSystem: false,
    },
    setUseImperialSystem(newValue: boolean) {
        if (this.debug) {
            const msg = `setUseImperialSystem triggered with: ${newValue}\n`;
            console.log(msg);
            this.log.concat(msg);
        }
        this.state.useImperialSystem = newValue;
    },
    getUseImperialSystem(): boolean {
        if (this.debug) {
            const msg = `getUseImperialSystem triggered\n`;
            console.log(msg);
            this.log.concat(msg);
        }
        return this.state.useImperialSystem;
    },
    getUsedMetrics(): string {
        if (this.debug) {
            const msg = `getUsedMetrics triggered\n`;
            console.log(msg);
            this.log.concat(msg);
        }
        return this.state.useImperialSystem
            ? WeatherUnits.Imperial
            : WeatherUnits.Metric;
    },
};
