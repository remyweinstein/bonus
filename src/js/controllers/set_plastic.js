'use strict';

import { setCard } from '@/js/controllers/personal.js'

export function render() {
    // Привязка пластиковой карты
    set_card.addEventListener("click", () => setCard());
}
