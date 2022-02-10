'use strict';

import * as Personal from '@/js/controllers/personal.js'
import {html} from '@/js/views/personal_update.js'
import { APP } from '@/js/config.js'

export function render() {
    document.querySelector(APP).innerHTML = html;
    
    // Переход на пластиковую карту
    personal_changeCard_button.addEventListener("click", () => {
        Personal.changeCard();
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
        Personal.changeProfileData();
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
        Personal.changeCardType();
      });
    });
     */
    
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
}