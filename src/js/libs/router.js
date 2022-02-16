'use strict';

import { routes, APP } from '@/js/config.js'
import { getSection, setSection } from '@/js/libs/storage.js'
import { init } from '@/js/app.js'
import { remove } from '@/js/libs/functions.js'

let sections = routes;

export function run(section) {
    let prevSection = getSection();
    
    if (!section) {
        section = "adult";
    }
    
    if (prevSection !== section || APP.innerHTML === "") {
        loadController(section);
        setSection(section);
    }
}

function animatePage(template) {
    let div = document.createElement('div');
    div.innerHTML = template;
    let newPage = div.children[0];
    let width = document.documentElement.clientWidth;
    let oldPage = APP.children[0];
    var i = 0;

    newPage.style.left = -width + 'px';
    newPage.classList.add('newPage');
    
    if (oldPage) {
        oldPage.classList.add('oldPage');
    }

    APP.insertBefore(newPage, oldPage);
    
    let animatePages = setInterval(function() {
            i=i+30;
            
            if (i >= width) {
                clearInterval(animatePages);
                if (oldPage) {
                    remove([oldPage]);
                }
                newPage.style.left = '0px';
                newPage.classList.remove('newPage');
            } else {
                newPage.style.left = (-width + i) + 'px';
                if (oldPage) {
                    oldPage.style.left = i + 'px';
                }
            }
    }, 0.1);
}

export function routePrevSection() {
    let section = getSection();
    if (sections[section] && sections[section].prevSection) {
        run(sections[section].prevSection);
    }
}

function loadController(controller) {
    APP.removeEventListener('click', Event.click);
    
    require(['@/js/views/'+controller+'.html'], function(template) {
        animatePage(template.default);
        
        require(['@/js/controllers/'+controller], function(controller) {
          controller.render();
          init();
          APP.addEventListener('click', Event.click);
        });
    });
}