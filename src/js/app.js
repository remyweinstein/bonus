'use strict';

import { routes, APP } from '@/js/config.js'
import { getSection } from '@/js/libs/storage.js'
import { initPopups } from '@/js/libs/popups';
import { findFunction, hideLoader, closeNav, remove } from '@/js/libs/functions.js'
import { run } from '@/js/libs/router.js';
import { checkAuthorization, setFeedback } from '@/js/libs/connections.js'
import { animate, quad } from '@/js/libs/animate.js'
import { Events } from '@/js/libs/Events.js'
import { mask } from '@/js/libs/mask.js'

let lastPhone = "";
let secondsInterval = null;
let secondsLeft = 0;

let resetCodeTimer = null;
let resetCodeTimerValue = 0;
let sections = routes;
let Event = new Events();

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

    Event.clickLink = function (event) {
        let target = event.target;
        
        while (target !== this) {
            if (!target) {
                return;
            }
            
            if (target.hasAttribute('data-link-section')) {
                run(target.dataset.linkSection);
                //return;
            }

            if (target.hasAttribute('data-click')) {
                let contrl = target.dataset.click.split('.');
                findFunction(contrl[1], contrl[0]);
                //return;
            }
            
            if (target.id === "topnav-feedback" || target.id === "top-nav-msg") {
                console.log('zhopa');
                feedback.style.display = '';
                return;
            }
            
            if (target.id === "feedback-submit") {
                setFeedback();
                return;
            }
            
            if (target.id === "closeFeedback") {
                feedback.style.display = 'none';
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
    mask(document.querySelector('#feedback-phone'), "+7 (___) ___ ____", 3);
    remove(".store_map");
    clearTimeout(window.walletUpdater);
    hideLoader();
}