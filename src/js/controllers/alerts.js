'use strict';

import {html} from '@/js/views/alerts.js'
import { APP } from '@/js/config.js'

export function render() {
    document.querySelector(APP).innerHTML = html;
}
