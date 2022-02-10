'use strict';

import * as Conn from '@/js/libs/connections.js'
import template from '@/js/views/pre_registration.html'
import { APP } from '@/js/config.js'

export function render() {
    document.querySelector(APP).innerHTML = template;
    Conn.updateCities();
}
