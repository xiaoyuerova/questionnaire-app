import Cookies from "js-cookie";

export function set(k: string, v: string | object) {
    return Cookies.set(k, v)
}

export function get(k: string) {
    return Cookies.get(k)
}

export function remove(k: string) {
    Cookies.remove(k);
}