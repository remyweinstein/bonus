'use strict';

import * as Conf from '@/js/config.js'

export function getBearerToken() {
    return localStorage.getItem(Conf.LS_TOKEN_LINK) ? localStorage.getItem(Conf.LS_TOKEN_LINK) : "";
}

export function setBearerToken(value) {
    localStorage.setItem(Conf.LS_TOKEN_LINK, value);
}

export function getSection() {
    return localStorage.getItem("section");
}

export function setSection(value) {
    localStorage.setItem("section", value);
}

export function getLsLink() {
    return localStorage.getItem(Conf.LS_LINK);
}

export function setLsLink(value) {
    localStorage.setItem(Conf.LS_LINK, value);
}

export function clearAll() {
    localStorage.removeItem("walletData");
    localStorage.removeItem("LS_walletData");
    localStorage.removeItem("LS_walletData_02");
    localStorage.removeItem("LS_walletData_03");
    localStorage.removeItem("LS_walletData_04");
    localStorage.removeItem("LS_walletData_05");
    localStorage.removeItem("LS_walletData_06");
    localStorage.removeItem("LS_walletData_081221");
    localStorage.removeItem(Conf.LS_LINK);
    localStorage.removeItem(Conf.LS_TOKEN_LINK);
    localStorage.removeItem("section");
}