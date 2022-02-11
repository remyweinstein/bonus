'use strict';

import { updateCities } from '@/js/libs/connections.js'
import template from '@/js/views/pre_registration.html'
import { APP } from '@/js/config.js'

export function render() {
    animatePage(template);
//    APP.innerHTML = template;
    updateCities();
}
