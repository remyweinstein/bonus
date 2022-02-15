'use strict';

import { changeCard, changeProfileData, changeCardType } from '@/js/controllers/personal.js'
import { siblings, addClass, removeClass, togglePassword, changeTabs } from '@/js/libs/functions.js'

export function render() {
    Event.click = function (event) {
        var target = event.target;

        while (target !== this) {
            if (target.hasAttribute('data-change-tab')) {
                changeTabs(target);
                return;
            }
            // Переход на пластиковую карту
            if(target.id === "personal_changeCard_button") {
                changeCard();
                return;
            }
            
            if (target.id === "personal_changePassword_button") {
                changeProfileData();
            }
            
            if (target.id === "update_pass_toggle") {
                togglePassword(target);

            }
            
            if (target.id === "update_pass_toggle_confirm") {
                togglePassword(target);
            }

            if (target) {
                target = target.parentNode;
            } else {
                break;
            }
        }
    };

    // Смена пароля
    personal_new_pass.addEventListener("blur", (e) => {
        e.target.classList.remove("fail");
        personal_new_pass_popup.classList.remove("show");
    });
    personal_new_pass_confirmation.addEventListener("blur", (e) => {
        e.target.classList.remove("fail");
        personal_new_pass_confirmation_popup.classList.remove("show");
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
