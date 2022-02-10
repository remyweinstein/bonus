'use strict';

import template from '@/js/views/reg_success.html'
import { APP } from '@/js/config.js'

export function render() {
    document.querySelector(APP).innerHTML = template;
}
