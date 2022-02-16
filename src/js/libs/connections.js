/* global fetch */
'use strict';

import { API_URL } from '@/js/config.js'
import { getBearerToken, setBearerToken, clearAll, setSection } from '@/js/libs/storage.js'
import { showPopup } from '@/js/libs/popups.js'
import { showLoader, hideLoader } from '@/js/libs/functions.js'
import { animate, quad } from '@/js/libs/animate.js'

export function setFeedback() {
    let feedbackSubmitButton = document.getElementById("feedback-submit");
    feedbackSubmitButton.disabled = true;
    showLoader();

    API_setFeedback(JSON.stringify({
        "method": "setFeedback",
        "data": {
            "name": document.getElementById("feedback-name").value,
            "phone": document.getElementById("feedback-phone").value,
            "email": document.getElementById("feedback-email").value,
            "reason": document.getElementById("feedback-reason").value,
            "message": document.getElementById("feedback-message").value
        }
    }))
            .then(result => {
                console.log(result);
                if (result.status) {
                    showPopup("Готово", "Ваше сообщение передано оператору");
                    hideFeedback();
                    document.getElementById("feedback-message").value = "";
                } else {
                    onErrorCatch(result);
                }
            })
            .finally(() => {
                feedbackSubmitButton.disabled = false;
                hideLoader();
            });
}

function API_setFeedback(body) {
    return fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: body
    })
            .then(response => response.json())
            .catch(error => {
                return {
                    status: false,
                    description: error.message,
                    error: error
                };
            });
}

export async function reg() {
    let trueDate = null;

    if (reg_birthdate.value) {
        let td = reg_birthdate.value.split("-");
        trueDate = [td[2], td[1], td[0]].join("-");
    }

    lastPhone = reg_phone.value;

    reg_button.disabled = true;
    showLoader();

    let response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
            "method": "registration",
            "data": {
                "phone": reg_phone.value,
                "pass": reg_pass.value,
                "firstname": reg_firstname.value,
                "birthdate": trueDate,
                "discount": (discount.checked ? 1 : 0),
                "email": reg_email.value,
                "city": city.value
            }
        })
    });

    let result = await response.json();

    reg_button.disabled = false;
    hideLoader();

    if (result.status) {
        if (result.data && result.data.need_confirmation) {
            // Скрываем блок регистрации
            registration_cont.style.display = "none";

            // Демонстрируем блок ввода подтверждения
            reg_confirmation.style.display = "";
            reg_confirmation_code.scrollIntoView();
            reg_confirmation_code.classList.toggle("fail");
            reg_confirmation_code.focus();
            reg_confirmation_code_popup.classList.toggle("show");

            // Запускаем таймер отсчета для повторной отправки
            setConfirmationTimeout(result);
        }
    } else {
        if (result.description)
            showPopup("", result.description);
    }
}

function restartResetConfirmationTimer(seconds) {
    resetCodeTimerValue = seconds - 1;

    reset_confirmation_time.style.display = "";
    reset_confirmation_time.innerText = resetCodeTimerValue + " сек.";

    if (resetCodeTimer)
        clearInterval(resetCodeTimer);
    resetCodeTimer = setInterval(() => {
        reset_confirmation_time.style.display = "";
        reset_confirmation_time.innerText = resetCodeTimerValue + " сек.";
        resetCodeTimerValue--;

        if (!resetCodeTimerValue) {
            reset_button.disabled = false;
            reset_confirmation_time.style.display = "none";
            if (resetCodeTimer)
                clearInterval(resetCodeTimer);
        }
    }, 1000);
}

function setConfirmationTimeout(result) {
    confirmation_button_reset.style.display = "none";
    secondsLeft = result.data.seconds_left;
    reg_confirmation_code_popup.innerText = result.description;
    reg_confirmation_info.innerText = result.description;
    reg_confirmation_remind.innerText = "Повторная отправка будет доступна через " + secondsLeft + " сек.";
    if (secondsInterval)
        clearInterval(secondsInterval);
    secondsInterval = setInterval(() => {
        secondsLeft--;
        reg_confirmation_remind.innerText = "Повторная отправка будет доступна через " + secondsLeft + " сек.";
        if (secondsLeft <= 0) {
            clearInterval(secondsInterval);
            reg_confirmation_remind.innerText = "";

            confirmation_button_reset.style.display = "";
        }
    }, 1000);
}

export async function getReferLink() {
    let body = {
        "method": "getReferLink"
    };

    let response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": "Bearer " + getBearerToken()
        },
        body: JSON.stringify(body)
    });

    let result = await response.json();

    return result;
}

export async function getResetConfirmationCode() {
    if (reset_phone.value) {
        reset_button.disabled = true;

        let body = {
            "method": "getResetConfirmationCode",
            "data": {
                "phone": reset_phone.value
            }
        };

        let response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(body)
        });

        let result = await response.json();

        if (result.status) {
            reset_confirmation.style.opacity = 0;
            reset_confirmation.style.display = "";

            animate({
                duration: 1000,
                timing: quad,
                draw: function (progress, options) {
                    reset_confirmation.style.opacity = progress;
                },
                callback: function (options) { }
            });

            reset_confirmation_info.innerText = result.description;
            if (result.data.seconds_left)
                restartResetConfirmationTimer(result.data.seconds_left);
        } else {
            reset_button.disabled = false;
            showPopup("Внимание", result.description);
        }
    }
}

export function checkAuthorization() {
    return fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": "Bearer " + getBearerToken()
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

    let response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(body)
    });

    let result = await response.json();

    reset_confirmation_button.disabled = false;

    if (result.status) {
        Router.run("wallet");
    } else {
        showPopup("Внимание", result.description, null, null, function () {
            reset_confirmation_code.value = "";
            reset_confirmation_code.focus();
        });
    }
}

export async function updateCities() {
    if (!city.children.length) {
        let response = await fetch(API_URL, {
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
                if (element.status === 2)
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

        let response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(body)
        });

        let result = await response.json();

        confirmation_button.disabled = false;
        hideLoader();

        if (result.status) {
            if (result.data.setNewPassword === undefined) {
                Router.run("reg_success");
            } else {
                Router.run("intro");
            }
        } else {
            if (result.description) {
                reg_confirmation_code.value = "";
                showPopup("Внимание", result.description);
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

        let response = await fetch(API_URL, {
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
    if (auth_phone.value === "") {
        auth_phone.scrollIntoView();
        auth_phone.classList.toggle("fail");
        auth_phone.focus();
        auth_phone_popup.classList.toggle("show");
        return;
    }
    if (auth_pass.value === "") {
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

        let response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(body)
        });

        let result = await response.json();

        auth_button.disabled = false;

        if (result.status) {
            clearAll();
            setSection("wallet");
            setBearerToken(result.data.token);

            location.reload();
            // Router.run("wallet");
        } else {
            showPopup("", result.description);
        }
    }
}

export async function logOff() {
    let body = {
        "method": "logOff"
    };

    let response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(body)
    });

    let result = await response.json();

    if (result.status) {
        clearAll();

        location.reload();
    }

    return result;
}