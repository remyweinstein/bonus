'use strict';

export function getGeolink(title, description) {
    let GeolinkElement = document.createElement("span");
    
    GeolinkElement.classList.add("ymaps-geolink");
    GeolinkElement.setAttribute("data-description", description);
    GeolinkElement.innerText = title;

    return GeolinkElement;
}

export function getGeoMap() {
    return new ymaps.Map('map', {
        center: [48.4827, 135.084],
        zoom: 10
    }, {
        searchControlProvider: 'yandex#search'
    });
}

export function getStoreToGeoMap(coordinates, city, title, shedule, phone, rsa_id) {
    document.querySelectorAll(".store_map").forEach(function(el) {
        el.parentNode.removeChild(el);
    });
    
    let div = document.createElement("div");
    div.innerHTML = "<div class='store_map'><div class='store_map-bg'></div><div class='store_map-block'><div id='map_city'>" + city + "</div><div id='map_info'><div class='map_info-item'><span class='map_info-item-key'>Адрес:</span><span class='map_info-item-value'>" + title + "</span></div><div class='map_info-item'><span class='map_info-item-key'>Время работы:</span><span class='map_info-item-value'>" + shedule + "</span></div><div class='map_info-item'><span class='map_info-item-key'>Телефон:</span><span class='map_info-item-value'><a href='tel:+7" + phone.slice(1) + "'>" + phone + "</a></span></div></div><div id='map'></div></div>";
    document.body.append(div.children[0]);

    let x = parseFloat(coordinates.split(',')[0]);
    let y = parseFloat(coordinates.split(',')[1]);

    var myMap = new ymaps.Map("map", {
        center: [x, y],
        zoom: 12
    });

    let objectManager = new ymaps.ObjectManager({
        clusterize: true,
        gridSize: 32,
        clusterDisableClickZoom: true
    });

    objectManager.objects.options.set('preset', 'islands#greenDotIcon');
    objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');

    objectManager.add({
        type: 'Feature',
        id: rsa_id,
        geometry: {
            type: 'Point',
            coordinates: [x, y]
        },
        properties: {
            hintContent: title,
            balloonContentHeader: '',
        }
    });

    myMap.geoObjects.add(objectManager);
}

document.addEventListener("click", (e) => {
    
    if (e.target.classList.contains("store_map-bg")) {
        document.querySelectorAll(".store_map").forEach(function(el) {
            el.parentNode.removeChild(el);
        });
    }
    if (e.target.parentNode.classList.contains("store_block")) {
        let el = e.target.parentNode;
        let coordinates = el.dataset.coordinates;
        let title = el.querySelector(".store_block-title").innerHTML;
        let shedule = el.querySelector(".store_block-shedule").innerHTML;
        let phone = el.dataset.phone;
        let city = el.dataset.city;
        let rsa_id = el.dataset.rsa;

        getStoreToGeoMap(coordinates, city, title, shedule, phone, rsa_id);
    }
});