'use strict';

import { changeCard, changeProfileData, changeCardType } from '@/js/controllers/personal.js'
import { siblings, addClass, removeClass } from '@/js/libs/functions.js'

export function render() {
    Event.click = function (event) {
        var target = event.target;

        while (target !== this) {
            if (target.hasAttribute('data-change-tab')) {
                const targetContent = document.querySelectorAll(".system_tabs-content-item-change")[(target.dataset.changeTab - 1)];
                addClass(target, "tab_h_active");
                addClass(targetContent, "tab_c_active");
                removeClass(siblings(target), "tab_h_active");
                removeClass(siblings(targetContent), "tab_c_active");
                return;
            }

            if (target) {
                target = target.parentNode;
            } else {
                break;
            }
        }
    };

    // Переход на пластиковую карту
    personal_changeCard_button.addEventListener("click", () => {
        changeCard();
    });
    // Смена пароля
    personal_new_pass.addEventListener("blur", (e) => {
        e.target.classList.remove("fail");
        personal_new_pass_popup.classList.remove("show");
    });
    personal_new_pass_confirmation.addEventListener("blur", (e) => {
        e.target.classList.remove("fail");
        personal_new_pass_confirmation_popup.classList.remove("show");
    });
    personal_changePassword_button.addEventListener("click", () => {
        changeProfileData();
    });
    update_pass_toggle.addEventListener("click", () => {
        personal_new_pass.type = (personal_new_pass.type === "password" ? "text" : "password");
        personal_new_pass_confirmation.type = (personal_new_pass_confirmation.type === "password" ? "text" : "password");
        update_pass_toggle.style.color = (personal_new_pass.type === "password" ? "black" : "#4eb5e6");
    });
    update_pass_toggle_confirm.addEventListener("click", () => {
        personal_new_pass_confirmation.type = (personal_new_pass_confirmation.type === "password" ? "text" : "password");
        personal_new_pass.type = (personal_new_pass.type === "password" ? "text" : "password");
        update_pass_toggle_confirm.style.color = (personal_new_pass_confirmation.type === "password" ? "black" : "#4eb5e6");
    });
    // Смена типа карты
    /*
     document.querySelectorAll(".system_tabs-head-item-change").forEach(item => {
     item.addEventListener("click", () => {
     changeCardType();
     });
     });
     */
}
