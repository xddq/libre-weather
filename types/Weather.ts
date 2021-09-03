/**
 * @author Pierre Dahmani
 * @created 02.09.2021
 * @file Contains type definitions for all the weather specific data.
 * Typed using app.quicktype.io and the api responses.
 */

// TODO(pierre): disable eslint errors here. Don't bother how machine thinks,
// bother how I think (which is top down) about type defs.

/**
 * @description Geolocation response types
 */
export interface GeolocationResponse extends Array<Geolocation> {}

/**
 * @description Geolocation response types
 */
export interface Geolocation {
    name: string;
    local_names: LocalNames;
    lat: number;
    lon: number;
    country: string;
}

/**
 * @description Geolocation response types
 */
export interface LocalNames {
    af?: string;
    ar?: string;
    ascii: string;
    az?: string;
    bg?: string;
    ca?: string;
    da?: string;
    de?: string;
    el?: string;
    en?: string;
    eu?: string;
    fa?: string;
    feature_name: string;
    fi?: string;
    fr?: string;
    gl?: string;
    he?: string;
    hi?: string;
    hr?: string;
    hu?: string;
    id?: string;
    it?: string;
    ja?: string;
    la?: string;
    lt?: string;
    mk?: string;
    nl?: string;
    no?: string;
    pl?: string;
    pt?: string;
    ro?: string;
    ru?: string;
    sk?: string;
    sl?: string;
    sr?: string;
    th?: string;
    tr?: string;
}

/**
 * @description Openweathermap weather api response
 */
export interface WeatherResponse {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: Current;
    minutely: Minutely[];
    hourly: Current[];
    daily: Daily[];
}

export interface Current {
    dt: number;
    sunrise?: number;
    sunset?: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: Weather[];
    pop?: number;
}

export interface Weather {
    id: number;
    main: Main;
    description: Description;
    icon: Icon;
}

export enum Description {
    ClearSky = "clear sky",
    LightRain = "light rain",
    OvercastClouds = "overcast clouds",
    ScatteredClouds = "scattered clouds",
}

export enum Icon {
    The01D = "01d",
    The01N = "01n",
    The03D = "03d",
    The04D = "04d",
    The10D = "10d",
}

export enum Main {
    Clear = "Clear",
    Clouds = "Clouds",
    Rain = "Rain",
}

export interface Daily {
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    temp: Temp;
    feels_like: FeelsLike;
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: Weather[];
    clouds: number;
    pop: number;
    uvi: number;
    rain?: number;
}

export interface FeelsLike {
    day: number;
    night: number;
    eve: number;
    morn: number;
}

export interface Temp {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
}

export interface Minutely {
    dt: number;
    precipitation: number;
}
