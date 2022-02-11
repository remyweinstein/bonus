'use strict';

import { animatePage } from '@/js/libs/router.js'
import template from '@/js/views/rules.html'
import { APP } from '@/js/config.js'

export function render() {
    animatePage(template);
//    APP.innerHTML = template;
}