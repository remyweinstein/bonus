'use strict';

import template from '@/js/views/set_plastic.html'
import { setCard } from '@/js/controllers/personal.js'
import { APP } from '@/js/config.js'

export function render() {
    document.querySelector(APP).innerHTML = template;
    
    // Привязка пластиковой карты
    set_card.addEventListener("click", () => setCard());
}
