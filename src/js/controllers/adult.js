'use strict';

import { html } from '@/js/views/adult.js'
import { APP } from '@/js/config.js'

export function render() {
    document.querySelector(APP).innerHTML = html;
}