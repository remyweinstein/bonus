'use strict';

import { animatePage } from '@/js/libs/router.js'
import template from '@/js/views/reg_success.html'
import { APP } from '@/js/config.js'

export function render() {
    animatePage(template);
//    APP.innerHTML = template;
}
