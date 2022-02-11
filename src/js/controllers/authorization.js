'use strict';

import { animatePage } from '@/js/libs/router.js'
import * as Util from '@/js/libs/functions.js'
import template from '@/js/views/authorization.html'
import { APP } from '@/js/config.js'

export function render() {
    animatePage(template);
    APP.innerHTML = template;
    
    auth_phone.addEventListener("blur", (e) => {
        e.target.classList.remove("fail");
        auth_phone_popup.classList.remove("show");
    });
    auth_phone.addEventListener("change", (e) => {
        reg_phone.value = auth_phone.value;
        reset_phone.value = auth_phone.value;
    });
    auth_phone.addEventListener("input", (e) => {
        Util.modifyInput(e.target);
    });
    auth_pass.addEventListener("blur", (e) => {
        e.target.classList.remove("fail");
        auth_pass_popup.classList.remove("show");
    });
    auth_pass_toggle.addEventListener("click", () => {
        auth_pass.type = (auth_pass.type === "password" ? "text" : "password");
        auth_pass_toggle.style.color = (auth_pass.type === "password" ? "black" : "#4eb5e6");
    });
    $('#auth_phone').mask('+7-000-000-00-00');

}
