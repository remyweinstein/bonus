'use strict';

export function getGeolink(title, description) {
    let GeolinkElement = document.createElement("span");
    
    GeolinkElement.classList.add("ymaps-geolink");
    GeolinkElement.setAttribute("data-description", description);
    GeolinkElement.innerText = title;

    return GeolinkElement;
}

function getGeoMap() {
    return new ymaps.Map('map', {
        center: [48.4827, 135.084],
        zoom: 10
    }, {
        searchControlProvider: 'yandex#search'
    });
}