'use strict';

import { modifyInput } from '@/js/libs/functions.js'
import { showPopup } from '@/js/libs/popups.js'
import { mask } from '@/js/libs/mask.js'

export function render() {
    Event.click = function (event) {
        var target = event.target;

        while (target !== this) {
            if (target.id === "reset_button") {
                if (canGetResetConfirmationCode()) {
                    showPopup("Подтверждение звонком", "Ожидайте звонок на номер:\n" + reg_phone.value, "На звонок отвечать не требуется, введите последние 4-ре цифры номера телефона входящего звонка.", "Запросить звонок", getResetConfirmationCode);
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

    // Вход без пароля
    reset_phone.addEventListener("blur", (e) => {
        e.target.classList.remove("fail");
        reset_phone_popup.classList.remove("show");
    });
    reset_phone.addEventListener("change", () => {
        reg_phone.value = reset_phone.value;
        auth_phone.value = reset_phone.value;
    });
    reset_phone.addEventListener("input", () => {
        reset_button.disabled = (reset_phone.value ? false : true);
        modifyInput(e.target);
    });
    reset_confirmation_code.addEventListener("input", (e) => {
        reset_confirmation_button.disabled = (reset_confirmation_code.value.length === 4 ? false : true);
    });

    mask(document.querySelector('#reset_phone'), "+7 (___) ___ ____", 3);
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
