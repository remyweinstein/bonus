'use strict';

import * as Util from '@/js/libs/functions.js'
import * as Animate from '@/js/libs/animate.js'

export function initPopups() {
    document.querySelectorAll(".popup-text").forEach(function (item) {
        item.addEventListener("click", function () {
            if (item.classList.contains("show")) {
                item.classList.remove("show");
            }
        });
    });
}

export function showPopup(title, description, message, buttonText, callback) {
    buttonText = !buttonText ? "Ок" : buttonText;
    callback = !callback ? null : callback;

    Util.hideLoader();

    overlay.style.display = "";

    popupTitle.style.display = (title ? "" : "none");
    popupTitle.innerText = title;
    popupDescription.style.display = (description ? "" : "none");
    popupDescription.innerText = description;
    popupMessage.style.display = (message ? "" : "none");
    popupMessage.innerText = message;
    popupButton.innerText = buttonText;

    overlay.callback = callback;

    Animate.animate({
        duration: 333,
        timing: Animate.quad,
        draw: function (progress, options) {
            overlay.style.opacity = progress;
            // popupMessage.innerText = options.fullText.substring(0, options.fullText.length * progress);
        },
        fullText: message
    });
}
