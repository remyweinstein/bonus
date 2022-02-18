'use strict';

import { modifyInput, togglePassword, addClass, removeClass, siblings, changeTabs } from '@/js/libs/functions.js'
import { mask } from '@/js/libs/mask.js'

export function render() {
    Event.click = function (event) {
        var target = event.target;

        while (target !== this) {
            if (target.hasAttribute('data-change-tab')) {
                changeTabs(target);
                return;
            }
            
            if (target.id === "auth_pass_toggle") {
                togglePassword(target);
            }

            if (target) {
                target = target.parentNode;
            } else {
                break;
            }
        }
    };

    auth_phone.addEventListener("blur", (e) => {
        e.target.classList.remove("fail");
        auth_phone_popup.classList.remove("show");
    });
    auth_phone.addEventListener("change", (e) => {
        wrapper_auth_phone.setAttribute("placeholder", changePlaceholderForPhone(e.target.value));
        //reset_phone.value = auth_phone.value;
    });
    auth_phone.addEventListener("keyup", (e) => {
        wrapper_auth_phone.setAttribute("placeholder", changePlaceholderForPhone(e.target.value));
        //reset_phone.value = auth_phone.value;
    });
    auth_phone.addEventListener("input", (e) => {
        modifyInput(e.target);
    });
    auth_pass.addEventListener("blur", (e) => {
        e.target.classList.remove("fail");
        auth_pass_popup.classList.remove("show");
    });
    
    mask(document.querySelector('#auth_phone'), "+7 (___) ___ ____", 3);
}

function changePlaceholderForPhone(value) {
    return value + "+7 (___) ___ ____".slice(value.length);
}
