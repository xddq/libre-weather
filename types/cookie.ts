/**
 *
 * Author: Pierre Dahmani
 * Created: 14.01.2022
 *
 * Description: Contains types for all cookie related data.
 */

export enum CookieParty {
    thirdParty = "third-party",
    firstParty = "first-party",
}

export interface CookiePolicyInput {
    name: string;
    party: CookieParty;
    description: string;
}

// NOTE(pierre): if this is ever required in more places, move this to an
// according file.
export enum LastSearchCookieNames {
    city = "lastSearchCity",
    countryCode = "lastSearchCountryCode",
    usersOwnApiKey = "lastSearchOwnApiKey",
    stateCode = "lastSearchStateCode",
}
