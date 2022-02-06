'use strict';

import * as Util from '@/js/libs/functions.js'
import * as Animate from '@/js/libs/animate.js'

export function initPopups() {
    console.log('init popup');
    let popups = document.getElementsByClassName("popup-text");
    for (let index = 0; index < popups.length; index++) {
        const element = popups[index];
        element.addEventListener("click", function(e) {
            if (element.classList.contains("show")) element.classList.remove("show");
        });
    }
}

export function showPopup(title, description, message, buttonText, callback) {
  if (!buttonText) buttonText = "Ок";
  if (!callback) callback = null;

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
