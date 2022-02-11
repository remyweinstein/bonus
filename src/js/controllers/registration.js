'use strict';

import { showPopup } from '@/js/libs/popups.js'
import { modifyInput } from '@/js/libs/functions.js'

export function render() {
    
    reg_phone.addEventListener("blur", (e) => {
        e.target.classList.remove("fail");
        reg_phone_popup.classList.remove("show");
    });
    reg_phone.addEventListener("change", (e) => {
        auth_phone.value = reg_phone.value;
        reset_phone.value = reg_phone.value;
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
    reg_pass_toggle.addEventListener("click", () => {
        reg_pass.type = (reg_pass.type === "password" ? "text" : "password");
        reg_pass_confirm.type = (reg_pass_confirm.type === "password" ? "text" : "password");
        reg_pass_toggle.style.color = (reg_pass.type === "password" ? "black" : "#4eb5e6");
    });
    reg_pass_toggle_confirm.addEventListener("click", () => {
        reg_pass_confirm.type = (reg_pass_confirm.type === "password" ? "text" : "password");
        reg_pass.type = (reg_pass.type === "password" ? "text" : "password");
        reg_pass_toggle_confirm.style.color = (reg_pass_confirm.type === "password" ? "black" : "#4eb5e6");
    });
    reg_button.addEventListener("click", () => {
        if (checkReg()) {
            showPopup("Подтверждение звонком", "Вам позвонят на номер\n" + reg_phone.value, "На звонок отвечать не требуется, введите последние четыре цифры номера телефона с которого совершён звонок", "Запросить звонок", reg);
        }
    });
    $('#reg_phone').mask('+7-000-000-00-00');
    $('#reg_birthdate').mask('00-00-0000');
    
    Conn.updateCities().then(result => {
        registration_cont.style.display = "";
        reg_confirmation.style.display = "none";

        prem.checked = true;
        discount.checked = false;
        document.getElementById("loyalty-system").style.display = (city.options[city.options.selectedIndex].getAttribute("default-discount") === 0 ? "none" : "");
    });
    
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
