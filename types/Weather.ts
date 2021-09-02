/**
 * @author Pierre Dahmani
 * @created 02.09.2021
 * @file Contains type definitions for all the weather specific data.
 */
export interface GeolocationResponse extends Array<Geolocation> {}

export interface Geolocation {
    name: string;
    local_names: LocalNames;
    lat: number;
    lon: number;
    country: string;
}

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
