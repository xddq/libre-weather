/**
 *
 * Author: Pierre Dahmani
 * Created: 13.01.2022
 *
 * Description: Utilities for handling cookies.
 */

// Sample from here: https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
export const getCookieValue = (name: string): string | null => {
    const cookie = document.cookie;
    const cookieValue = cookie
        ?.split("; ")
        ?.find((row) => row.startsWith(name))
        ?.split("=")[1];
    if (cookieValue === undefined || cookieValue === "") {
        return null;
    }
    return cookieValue;
};

export const setCookie = (name: string, value: string) => {
    document.cookie = `${name}=${value}; Secure`;
};
