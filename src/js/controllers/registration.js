'use strict';

import { showPopup } from '@/js/libs/popups.js'
import { updateCities } from '@/js/libs/connections.js'
import { modifyInput } from '@/js/libs/functions.js'
import { mask } from '@/js/libs/mask.js'
import { siblings, addClass, togglePassword, changeTabs, removeClass } from '@/js/libs/functions.js'
import { MASKPHONE } from '@/js/config.js';

export function render() {
    Event.click = function (event) {
        var target = event.target;

        while (target !== this) {
            if (target.hasAttribute('data-change-tab')) {
                changeTabs(target);
                return;
            }
            
            if (target.id === "reg_pass_toggle") {
                togglePassword(target);
                return;
            }
            
            if (target.id === "reg_pass_toggle_confirm") {
                togglePassword(target);
                return;
            }
            
            if (target.id === "reg_button") {
                if (checkReg()) {
                    showPopup("Подтверждение звонком", "Вам позвонят на номер\n" + reg_phone.value, "На звонок отвечать не требуется, введите последние четыре цифры номера телефона с которого совершён звонок", "Запросить звонок", reg);
                }
                return;
            }

            if (target) {
                target = target.parentNode;
            } else {
                break;
            }
        }
    };

    reg_phone.addEventListener("blur", (e) => {
        e.target.classList.remove("fail");
        reg_phone_popup.classList.remove("show");
    });
    reg_phone.addEventListener("change", (e) => {
        //auth_phone.value = reg_phone.value;
        //reset_phone.value = reg_phone.value;
    });
    reg_phone.addEventListener("input", (e) => {
        modifyInput(e.target);
    });
    reg_pass.addEventListener("blur", (e) => {
        e.target.classList.remove("fail");
        reg_pass_popup.classList.remove("show");
    });
    // reg_cardNumber.addEventListener("blur",         (e) => { e.target.classList.remove("fail"); reg_cardNumber_popup.classList.remove("show"); });
    reg_confirmation_code.addEventListener("blur", (e) => {
        e.target.classList.remove("fail");
        reg_confirmation_code_popup.classList.remove("show");
    });
    reg_birthdate.addEventListener("blur", (e) => {
        e.target.classList.remove("fail");
        reg_birthdate_popup.classList.remove("show");
    });
    reg_phone.setAttribute("placeholder", MASKPHONE);
    mask(document.querySelector('#reg_phone'), MASKPHONE, 3);
    mask(document.querySelector('#reg_birthdate'), "__/__/____");
    
    /*
    updateCities().then(result => {
        registration_cont.style.display = "";
        reg_confirmation.style.display = "none";

        prem.checked = true;
        discount.checked = false;
        document.getElementById("loyalty-system").style.display = (city.options[city.options.selectedIndex].getAttribute("default-discount") === 0 ? "none" : "");
    });
    */
}

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
            showPopup("Внимание", "Вам должно быть 18 лет!");
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
        showPopup("Внимание", "Введенные пароли не совпадают!");
        return 0;
    }

    return 1;
}
