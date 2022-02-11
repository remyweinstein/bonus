'use strict';

import { routes, APP } from '@/js/config.js'
import { getSection } from '@/js/libs/storage.js'
import { initPopups } from '@/js/libs/popups';
import { findFunction, hideLoader, closeNav } from '@/js/libs/functions.js'
import { run } from '@/js/libs/router.js';
import { checkAuthorization } from '@/js/libs/connections.js'
import { animate, quad } from '@/js/libs/animate.js'
import { Events } from '@/js/libs/Events.js'

let lastPhone = "";
let secondsInterval = null;
let secondsLeft = 0;

let resetCodeTimer = null;
let resetCodeTimerValue = 0;
let sections = routes;
Event = new Events();

// Инициализация св-в приложения
document.addEventListener("DOMContentLoaded", function () {
    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker.register('/sw.js')
    //     .then((reg) => {
    //       // регистрация сработала
    //     }).catch((error) => {
    //       // регистрация прошла неудачно
    //     });
    // }
    init();
    
    Event.clickLink = function(event) {
      var target = event.target;

      while (target !== this) {
        if (target.hasAttribute('data-link-section')) {
            run(target.dataset.linkSection);
            //return;
        }
        
        if (target.hasAttribute('data-click')) {
            let contrl = target.dataset.click.split('.');
            findFunction(contrl[1], contrl[0]);
            return;
        }

        if (target) {
            target = target.parentNode;
        } else {
            break;
        }
      }
    };
    document.addEventListener('click', Event.clickLink);

    let section = getSection();
    checkAuthorization().then(result => {
        if (result.status) {
            if (!feedback_form.getAttribute("phone") && result.data.phone) {
                feedback_form.setAttribute("phone", result.data.phone);
                let userName = result.data.firstname + " " + result.data.middlename;
                feedback_form.src += "&answer_short_text_7059155=" + result.data.phone + (userName ? "&answer_short_text_96201=" + userName : "");
            }

            if (["wallet", "news", "personal", "stores", "refer"].indexOf(section) === -1) {
                section = "wallet";
            }
        } else {
            section = (section ? section : "adult");
        }
    });

    run(section);
}, false);

export function init() {
    let section = getSection() ? getSection() : 'adult';
    initPopups();

    // Сокрытие всплывающего окна
    overlay.addEventListener("click", function () {
        if (overlay.callback) {
            overlay.style.opacity = 0;
            overlay.style.display = "none";

            overlay.callback();
        } else {
            animate({
                duration: 333,
                timing: quad,
                draw: function (progress, options) {
                    overlay.style.opacity = 1 - progress;
                },
                callback: function (options) {
                    overlay.style.display = "none";
                }
            });
        }
    });
    
    console.log(section);
    
    document.querySelector("#top-nav").style.display = (sections[section] && sections[section].title ? "" : "none");
    document.querySelector("#top-nav-back").style.display = (sections[section] && sections[section].prevSection ? "" : "none");
    document.querySelector("#top-nav-msg").style.display = (sections[section] && !sections[section].prevSection ? "" : "none");
    document.querySelector("#top-nav-title").innerText = sections[section].title;
    document.querySelector("#top-nav-menu").style.display = (sections[section] && sections[section].showMenu ? "" : "none");
    document.querySelector("#top-nav-close").style.display = (["alerts"].indexOf(section) === -1 ? "none" : "");
    document.querySelector("#bottom-nav").style.display = (sections[section] && sections[section].showMenu ? "" : "none");

    document.querySelectorAll(".bottom-nav-element").forEach(function (item) {
        item.classList.remove("current-section");
        if (item.dataset.linkSection === section) {
            item.classList.add("current-section");
        }
    });
    document.querySelectorAll(".store_map").forEach(function (el) {
        el.parentNode.removeChild(el);
    });
    
    clearTimeout(window.walletUpdater);
    hideLoader();
}