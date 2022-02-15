'use strict';

import { setCard } from '@/js/controllers/personal.js'

export function render() {
    Event.click = function (event) {
        var target = event.target;

        while (target !== this) {
            // Привязка пластиковой карты
            if (target.id === "set_card") {
                setCard();
                return;
            }

            if (target) {
                target = target.parentNode;
            } else {
                break;
            }
        }
    };
}
