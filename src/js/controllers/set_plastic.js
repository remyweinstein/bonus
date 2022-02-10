'use strict';

import {html} from '@/js/views/set_plastic.js'
import { setCard } from '@/js/controllers/personal.js'
import { APP } from '@/js/config.js'

export function render() {
    document.querySelector(APP).innerHTML = html;
    
    // Привязка пластиковой карты
    set_card.addEventListener("click", () => setCard());
}
