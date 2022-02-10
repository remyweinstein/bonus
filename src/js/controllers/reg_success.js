'use strict';

import {html} from '@/js/views/reg_success.js'
import { APP } from '@/js/config.js'

export function render() {
    document.querySelector(APP).innerHTML = html;
}
