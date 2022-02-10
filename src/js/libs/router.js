'use strict';

import { routes, APP } from '@/js/config.js'
import { getSection, setSection } from '@/js/libs/storage.js'
import { init } from '@/js/app.js'

let sections = routes;

export function routePrevSection() {
    let section = getSection();
    if (sections[section] && sections[section].prevSection) {
        run(sections[section].prevSection);
    }
}

export function run(section) {
    let prevSection = getSection();
    
    if (!section) {
        section = "adult";
    }
    
    if (prevSection !== section || document.querySelector(APP).innerHTML === "") {
        loadController(section);
        setSection(section);
    }
}

function loadController(controller) {
    let app = document.querySelector(APP);
    
    app.removeEventListener('click', Event.click);
    
    require(['@/js/controllers/'+controller], function(controller) {
      controller.render();
      init();
      app.addEventListener('click', Event.click);
    });
}