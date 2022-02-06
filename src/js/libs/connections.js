'use strict';

import * as Conf from '@/js/config.js'
import * as Storage from '@/js/libs/storage.js'
import * as Popup from '@/js/libs/popups.js'
import * as Util from '@/js/libs/functions.js'

export function checkAuthorization() {
    return fetch(Conf.API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": "Bearer " + Storage.getBearerToken()
        },
        body: JSON.stringify({
            "method": "checkAuthorization"
        })
    }).then(response => response.json()).catch(error => {
        return {
            status: false,
            description: error.message,
            error: error
        };
    });
}

export async function checkResetConfirmationCode() {
    if (reset_phone.value.length < 16) {
        reset_phone.scrollIntoView();
        reset_phone.classList.add("fail");
        reset_phone.focus();
        reset_phone_popup.classList.toggle("show");
        return;
    }

    if (reset_confirmation_code.value.length < 4) {
        reset_confirmation_code.scrollIntoView();
        reset_confirmation_code.classList.add("fail");
        reset_confirmation_code.focus();
        return;
    }

    reset_confirmation_button.disabled = true;

    let body = {
        "method": "checkResetConfirmationCode",
        "data": {
            "phone": reset_phone.value,
            "code": reset_confirmation_code.value
        }
    };

    let response = await fetch(Conf.API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(body)
    });

    let result = await response.json();

    reset_confirmation_button.disabled = false;

    if (result.status) {
        drawSection("wallet");
    } else {
        Popup.showPopup("Внимание", result.description, null, null, function () {
            reset_confirmation_code.value = "";
            reset_confirmation_code.focus();
        });
    }
}

export async function updateCities() {
    if (!city.children.length) {
        let response = await fetch(Conf.API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                "method": "getCities"
            })
        });

        let result = await response.json();

        if (result.status) {
            result.data.forEach(element => {
                let option = document.createElement("option");
                option.value = element.id;
                option.innerText = element.title;
                option.setAttribute("default-discount", element.default_discount);
                if (element.status == 2)
                    option.selected = "selected";
                city.appendChild(option);
            });
        }
    }
}

export async function confirmation() {
    if (reg_confirmation_code.value.length < 4) {
        reg_confirmation_code.scrollIntoView();
        reg_confirmation_code.classList.add("fail");
        reg_confirmation_code.focus();
        reg_confirmation_code_popup.classList.toggle("show");
        return;
    }

    if (lastPhone && reg_confirmation_code.value) {
        confirmation_button.disabled = true;
        showLoader();

        let body = {
            "method": "confirmation",
            "data": {
                "phone": lastPhone,
                "code": reg_confirmation_code.value
            }
        };

        let response = await fetch(Conf.API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(body)
        });

        let result = await response.json();

        confirmation_button.disabled = false;
        Util.hideLoader();

        if (result.status) {
            if (result.data.setNewPassword == undefined) {
                drawSection("reg_success");
            } else {
                drawSection("intro");
            }
        } else {
            if (result.description) {
                reg_confirmation_code.value = "";
                Popup.showPopup("Внимание", result.description);
            }
        }
    }
}

export async function confirmationReset() {
    if (lastPhone) {
        confirmation_button_reset.disabled = true;

        let body = {
            "method": "confirmationReset",
            "data": {
                "phone": lastPhone
            }
        };

        let response = await fetch(Conf.API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(body)
        });

        let result = await response.json();

        confirmation_button_reset.disabled = false;

        if (result.status)
            setConfirmationTimeout(result);
    }
}

export async function auth() {
    if (auth_phone.value == "") {
        auth_phone.scrollIntoView();
        auth_phone.classList.toggle("fail");
        auth_phone.focus();
        auth_phone_popup.classList.toggle("show");
        return;
    }
    if (auth_pass.value == "") {
        auth_pass.scrollIntoView();
        auth_pass.classList.toggle("fail");
        auth_pass.focus();
        auth_pass_popup.classList.toggle("show");
        return;
    }

    if (auth_phone.value && auth_pass.value) {
        auth_button.disabled = true;

        let body = {
            "method": "authorization",
            "data": {
                "phone": auth_phone.value,
                "pass": auth_pass.value
            }
        };

        let response = await fetch(Conf.API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(body)
        });

        let result = await response.json();

        auth_button.disabled = false;

        if (result.status) {
            Storage.clearAll();

            localStorage.setItem("section", "wallet");
            localStorage.setItem(Conf.LS_TOKEN_LINK, result.data.token);

            location.reload();
            // drawSection("wallet");
        } else {
            Popup.showPopup("", result.description);
        }
    }
}

export async function logOff() {
    let body = {
        "method": "logOff"
    };

    let response = await fetch(Conf.API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(body)
    });

    let result = await response.json();

    if (result.status) {
        Storage.clearAll();

        location.reload();
    }

    return result;
}