'use strict';

import template from '@/js/views/intro.html'
import { APP } from '@/js/config.js'

export function render() {
    document.querySelector(APP).innerHTML = template;
}