'use strict';

//import $ from 'jquery';
import '@/js/vendor/jquery.mask.min.js'

import * as Storage from '@/js/libs/storage.js'
import * as Popups from '@/js/libs/popups';
import * as Util from '@/js/libs/functions.js'
import * as Geo from '@/js/libs/geo.js'
import * as Router from '@/js/libs/router.js';
import * as Conn from '@/js/libs/connections.js'
import * as Popup from '@/js/libs/popups.js'
import * as Animate from '@/js/libs/animate.js'

import * as Stores from '@/js/pages/stores.js'
import * as Personal from '@/js/pages/personal.js'

let lastPhone = "";
let secondsInterval = null;
let secondsLeft = 0;

let resetCodeTimer = null;
let resetCodeTimerValue = 0;

// Инициализация св-в приложения
document.addEventListener("DOMContentLoaded", function () {
    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker.register('/sw.js')
    //     .then((reg) => {
    //       // регистрация сработала
    //     }).catch((error) => {
    //       // регистрация прошла неудачно
    //     });
    // }
    Popups.initPopups();
    
    let linksRoute = document.querySelectorAll("[data-link-section]");
    linksRoute.forEach(function(item) {
        item.addEventListener("click", (e) => {
            Router.drawSection(e.target.dataset.linkSection);
        });
    });

    let links = document.querySelectorAll("[data-click]");
    links.forEach(function(item) {
        item.addEventListener("click", (e) => {
            let contrl = e.target.dataset.click.split('.');
            Util.findFunction(contrl[1], contrl[0]);
        });
    });

    auth_phone.addEventListener("blur", (e) => {
        dropFail(e.target);
        auth_phone_popup.classList.remove("show");
    });
    auth_phone.addEventListener("change", (e) => {
        reg_phone.value = auth_phone.value;
        reset_phone.value = auth_phone.value;
    });
    auth_phone.addEventListener("input", (e) => Util.modifyInput(e.target));

    reg_phone.addEventListener("blur", (e) => {
        dropFail(e.target);
        reg_phone_popup.classList.remove("show");
    });
    reg_phone.addEventListener("change", (e) => {
        auth_phone.value = reg_phone.value;
        reset_phone.value = reg_phone.value;
    });
    reg_phone.addEventListener("input", (e) => Util.modifyInput(e.target));

    auth_pass.addEventListener("blur", (e) => {
        dropFail(e.target);
        auth_pass_popup.classList.remove("show");
    });
    reg_pass.addEventListener("blur", (e) => {
        dropFail(e.target);
        reg_pass_popup.classList.remove("show");
    });
    // reg_cardNumber.addEventListener("blur",         (e) => { dropFail(e.target); reg_cardNumber_popup.classList.remove("show"); });
    reg_confirmation_code.addEventListener("blur", (e) => {
        dropFail(e.target);
        reg_confirmation_code_popup.classList.remove("show");
    });
    reg_birthdate.addEventListener("blur", (e) => {
        dropFail(e.target);
        reg_birthdate_popup.classList.remove("show");
    });

    // Переход на пластиковую карту
    personal_changeCard_button.addEventListener("click", () => {
        Personal.changeCard();
    });

    // Смена пароля
    personal_new_pass.addEventListener("blur", (e) => {
        dropFail(e.target);
        personal_new_pass_popup.classList.remove("show");
    });
    personal_new_pass_confirmation.addEventListener("blur", (e) => {
        dropFail(e.target);
        personal_new_pass_confirmation_popup.classList.remove("show");
    });
    personal_changePassword_button.addEventListener("click", () => {
        Personal.changeProfileData();
    });

    // Смена типа карты
    /*
    document.querySelectorAll(".system_tabs-head-item-change").forEach(item => {
      item.addEventListener("click", () => {
        Personal.changeCardType();
      });
    });
     */

    // Привязка пластиковой карты
    set_card.addEventListener("click", () => Personal.setCard());

    // Вход без пароля
    reset_phone.addEventListener("blur", (e) => {
        dropFail(e.target);
        reset_phone_popup.classList.remove("show");
    });
    reset_phone.addEventListener("change", (e) => {
        reg_phone.value = reset_phone.value;
        auth_phone.value = reset_phone.value;
    });
    reset_phone.addEventListener("input", (e) => {
        reset_button.disabled = (reset_phone.value ? false : true);
        Util.modifyInput(e.target)
    });
    reset_confirmation_code.addEventListener("input", (e) => {
        reset_confirmation_button.disabled = (reset_confirmation_code.value.length === 4 ? false : true);
    });
    $('#reset_phone').mask('+7-000-000-00-00');
    $('#reset_confirmation_code').mask('0000');

    auth_pass_toggle.addEventListener("click", (e) => {
        auth_pass.type = (auth_pass.type === "password" ? "text" : "password");
        auth_pass_toggle.style.color = (auth_pass.type === "password" ? "black" : "#4eb5e6");
    });
    reg_pass_toggle.addEventListener("click", (e) => {
        reg_pass.type = (reg_pass.type === "password" ? "text" : "password");
        reg_pass_confirm.type = (reg_pass_confirm.type === "password" ? "text" : "password");
        reg_pass_toggle.style.color = (reg_pass.type === "password" ? "black" : "#4eb5e6");
    });
    reg_pass_toggle_confirm.addEventListener("click", (e) => {
        reg_pass_confirm.type = (reg_pass_confirm.type === "password" ? "text" : "password");
        reg_pass.type = (reg_pass.type === "password" ? "text" : "password");
        reg_pass_toggle_confirm.style.color = (reg_pass_confirm.type === "password" ? "black" : "#4eb5e6");
    });

    update_pass_toggle.addEventListener("click", (e) => {
        personal_new_pass.type = (personal_new_pass.type === "password" ? "text" : "password");
        personal_new_pass_confirmation.type = (personal_new_pass_confirmation.type === "password" ? "text" : "password");
        update_pass_toggle.style.color = (personal_new_pass.type === "password" ? "black" : "#4eb5e6");
    });
    update_pass_toggle_confirm.addEventListener("click", (e) => {
        personal_new_pass_confirmation.type = (personal_new_pass_confirmation.type === "password" ? "text" : "password");
        personal_new_pass.type = (personal_new_pass.type === "password" ? "text" : "password");
        update_pass_toggle_confirm.style.color = (personal_new_pass_confirmation.type === "password" ? "black" : "#4eb5e6");
    });
    // reg_card_type_digital.addEventListener("change", (e) => {Personal.changeCardType();});
    // reg_card_type_analog.addEventListener("change", (e) => {Personal.changeCardType();});
    // Personal.changeCardType();

    reg_button.addEventListener("click", (e) => {
        if (checkReg()) {
            Popup.showPopup("Подтверждение звонком", "Вам позвонят на номер\n" + reg_phone.value, "На звонок отвечать не требуется, введите последние четыре цифры номера телефона с которого совершён звонок", "Запросить звонок", reg);
        }
    });

    reset_button.addEventListener("click", (e) => {
        if (canGetResetConfirmationCode()) {
            Popup.showPopup("Подтверждение звонком", "Ожидайте звонок на номер:\n" + reg_phone.value, "На звонок отвечать не требуется, введите последние 4-ре цифры номера телефона входящего звонка.", "Запросить звонок", getResetConfirmationCode);
        }
    });

    document.getElementById("transactions-details-button").addEventListener("click", (e) => {
        document.querySelector("#transactions").classList.toggle("transactionsOpen");
        document.querySelector("#transactions-details-button").innerHTML = ((transactions.classList.contains("transactionsOpen")) ? "скрыть детализацию" : "открыть детализацию");
    });

    // Выбор города
    store_cities.addEventListener("change", (e) => {
        Stores.getStoresList(store_cities.value);
    });

    $('#auth_phone').mask('+7-000-000-00-00');
    $('#reg_phone').mask('+7-000-000-00-00');
    $('#reg_birthdate').mask('00-00-0000');

    // Навигация
    let elements = document.getElementsByClassName("bottom-nav-element");
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", function (e) {
            if (e.currentTarget.getAttribute("section"))
                Router.drawSection(e.currentTarget.getAttribute("section"));
                Util.remove(document.querySelectorAll(".store_map"));
        });
    }

    // Сокрытие всплывающего окна
    overlay.addEventListener("click", function (e) {
        if (overlay.callback) {
            overlay.style.opacity = 0;
            overlay.style.display = "none";

            overlay.callback();
        } else {
            Animate.animate({
                duration: 333,
                timing: Animate.quad,
                draw: function (progress, options) {
                    overlay.style.opacity = 1 - progress;
                },
                callback: function (options) {
                    overlay.style.display = "none";
                }
            });
        }
    });

    //Маршрутизация
    let section = Storage.getSection();

    Conn.checkAuthorization().then(result => {
        if (result.status) {
            if (!feedback_form.getAttribute("phone") && result.data.phone) {
                feedback_form.setAttribute("phone", result.data.phone);
                let userName = result.data.firstname + " " + result.data.middlename;
                feedback_form.src += "&answer_short_text_7059155=" + result.data.phone + (userName ? "&answer_short_text_96201=" + userName : "");
            }

            if (["wallet", "news", "personal", "stores", "refer"].indexOf(section) === -1) {
                section = "wallet";
            }
        } else {
            section = (section ? section : "adult");
        }
    });

    Router.drawSection(section);
});

function checkReg() {
    if (reg_phone.value.length < 16) {
        reg_phone.scrollIntoView();
        reg_phone.classList.add("fail");
        reg_phone.focus();
        reg_phone_popup.classList.toggle("show");
        return 0;
    }
    // if (reg_card_type_digital.checked) {
    if (reg_pass.value.length < 6) {
        reg_pass.scrollIntoView();
        reg_pass.classList.add("fail");
        reg_pass.focus();
        reg_pass_popup.classList.toggle("show");
        return 0;
    }
    // } else {
    //   if (reg_cardNumber.value.length < 6) {
    //     reg_cardNumber.scrollIntoView();
    //     reg_cardNumber.classList.add("fail");
    //     reg_cardNumber.focus();
    //     reg_cardNumber_popup.classList.toggle("show");
    //     return 0;
    //   }
    // }

    let trueDate = null;

    if (reg_birthdate.value) {
        let td = reg_birthdate.value.split("-");
        trueDate = [td[2], td[1], td[0]].join("-");

        let bd = new Date(trueDate);
        let cd = new Date();
        if (cd.getFullYear() - bd.getFullYear() < 18 || reg_birthdate.value.length !== 10) {
            Popup.showPopup("Внимание", "Вам должно быть 18 лет!");
            return 0;
        }
    } else {
        reg_birthdate.scrollIntoView();
        reg_birthdate.classList.add("fail");
        reg_birthdate.focus();
        reg_birthdate_popup.classList.toggle("show");

        return 0;
    }

    if (reg_pass.value != reg_pass_confirm.value) {
        Popup.showPopup("Внимание", "Введенные пароли не совпадают!");
        return 0;
    }

    return 1;
}

function canGetResetConfirmationCode() {
    if (reset_phone.value.length < 16) {
        reset_phone.scrollIntoView();
        reset_phone.classList.add("fail");
        reset_phone.focus();
        reset_phone_popup.classList.toggle("show");
        return 0;
    }

    return 1;
}

function attentionFocus(element) {
    element.scrollIntoView();
    element.classList.add("fail");
    element.focus();
    document.getElementById(element.getAttribute("popup_id")).classList.toggle("show");
}

function dropFail(element) {
    if (element.value && element.classList.contains("fail")) {
        element.classList.remove("fail");
    }
}

document.querySelectorAll(".system_tabs-head-item").forEach(item => {
    item.addEventListener("click", () => {
        item.parentNode.querySelectorAll(".system_tabs-head-item").forEach(function(el) {
            el.classList.remove("tab_h_active");
        });
        item.classList.add("tab_h_active");
        document.querySelectorAll(".system_tabs-head-item").forEach(function(el) {
            el.classList.remove("tab_c_active");
        });
        item.classList.add("tab_c_active");
    });
});

document.querySelectorAll(".system_tabs-head-item-change").forEach(item => {
    item.addEventListener("click", () => {
        item.parentNode.querySelectorAll(".system_tabs-head-item-change").forEach(function(el) {
            el.classList.remove("tab_h_active");
        });
        item.classList.add("tab_h_active");
        document.querySelectorAll(".system_tabs-head-item-change").forEach(function(el) {
            el.classList.remove("tab_c_active");
        });
        item.classList.add("tab_c_active");
    });
});