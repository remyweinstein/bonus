'use strict';

import { modifyInput } from '@/js/libs/functions.js'
import { mask } from '@/js/libs/mask.js'

export function render() {
    auth_phone.addEventListener("blur", (e) => {
        e.target.classList.remove("fail");
        auth_phone_popup.classList.remove("show");
    });
    auth_phone.addEventListener("change", (e) => {
        //reg_phone.value = auth_phone.value;
        //reset_phone.value = auth_phone.value;
    });
    auth_phone.addEventListener("input", (e) => {
        modifyInput(e.target);
    });
    auth_pass.addEventListener("blur", (e) => {
        e.target.classList.remove("fail");
        auth_pass_popup.classList.remove("show");
    });
    auth_pass_toggle.addEventListener("click", () => {
        auth_pass.type = (auth_pass.type === "password" ? "text" : "password");
        auth_pass_toggle.style.color = (auth_pass.type === "password" ? "black" : "#4eb5e6");
    });
    
    mask(document.querySelector('#auth_phone'), "+7 (___) ___ ____", 3);

}
