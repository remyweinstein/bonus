'use strict';

import * as Conn from '@/js/libs/connections.js'
import {html} from '@/js/views/pre_registration.js'
import { APP } from '@/js/config.js'

export function render() {
    document.querySelector(APP).innerHTML = html;
    Conn.updateCities();
}
