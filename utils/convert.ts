/**
 *
 * Author: Pierre Dahmani
 * Created: 09.01.2022
 *
 * Description: Utilites used for conversion of values. (mph to km/h, etc..)
 */

export const celsiusToFahrenheit = (celius: number) => (celius * 9) / 5 + 32;

export const meterPerSecondToKilometerPerHour = (mps: number) => mps * 3.6;

export const kilometerPerHourToMilesPerHour = (kmh: number) =>
    // 1 mile = 1.609344 km
    kmh * (1 / 1.609344);
