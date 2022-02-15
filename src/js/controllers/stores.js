/* global fetch */
'use strict';

import { showPopup } from '@/js/libs/popups.js'
import { APP, API_URL } from '@/js/config.js'
import { remove } from '@/js/libs/functions.js'

export function render() {
    Event.click = function (event) {
        var target = event.target;

        while (target !== this) {
            if (target.hasAttribute("data-close-map")) {
                remove(".store_map");
                return;
            }
            
            if (target.classList.contains("store_map-bg")) {
                remove(".store_map");
                return;
            }
            
            if (target.parentNode.classList.contains("store_block")) {
                getStoreToGeoMap(target.parentNode);
                return;
            }

            if (target) {
                target = target.parentNode;
            } else {
                break;
            }
        }
    };
    
    // Выбор города
    store_cities.addEventListener("change", () => {
        getStoresList(store_cities.value);
    });

    updateStoresData();
}

export function updateStoresData() {
    if (!storesList.children.length) {
        const city_id = false;
        getStores().then(result => {
            if (result.status) {
                result.cities.forEach(city => {
                    let option = document.createElement("option");
                    option.value = city.id;
                    option.innerText = city.name;
                    store_cities.appendChild(option);
                });
                city_id = result.cities[0].id;
                getStoresList(city_id);
            }

        }).catch(error => {
            console.warn(error);
            showPopup("Внимание", "Произошла ошибка, попробуйте позже.");
        });
    }
}

export function getStores() {
    return fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
            "method": "getStores"
        })
    }).then(response => response.json()).catch(error => {
        return {
            status: false,
            description: error.message,
            error: error
        };
    });
}

export async function getStoresList(city_id) {
    let body = {
        "method": "getStoresList",
        "city_id": city_id
    };

    let response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(body)
    });

    let result = await response.json();

    document.querySelector("#storesList").innerHTML = "";

    result.data.forEach(city => {
        let div = document.createElement("div");
        div.innerHTML = "<div class='store_block' data-rsa='" + city.rsa_id + "' data-coordinates='" + city.coordinates + "' data-phone='" + city.phone + "' data-city='" + city.city_name + "'><div class='store_block-title'>" + city.store_name + "</div><div class='store_block-shedule'>" + city.shedule + "</div><span class='show_store'>></span></div>";
        document.querySelector("#storesList").append(div.children[0]);
    });
}

function getStoreToGeoMap(el) {
    const coordinates = el.dataset.coordinates,
          title = el.querySelector(".store_block-title").innerHTML,
          shedule = el.querySelector(".store_block-shedule").innerHTML,
          phone = el.dataset.phone,
          city = el.dataset.city,
          rsa_id = el.dataset.rsa;
  
    remove(".store_map");
    
    let div = document.createElement("div");
    div.innerHTML = "<div class='store_map'><div class='store_map-bg'></div><div class='store_map-block'><div id='map_city'>" + city + "<div class='closebtn' data-close-map>&times;</div></div><div id='map_info'><div class='map_info-item'><span class='map_info-item-key'>Адрес:</span><span class='map_info-item-value'>" + title + "</span></div><div class='map_info-item'><span class='map_info-item-key'>Время работы:</span><span class='map_info-item-value'>" + shedule + "</span></div><div class='map_info-item'><span class='map_info-item-key'>Телефон:</span><span class='map_info-item-value'><a href='tel:+7" + phone.slice(1) + "'>" + phone + "</a></span></div></div><div id='map'></div></div>";
    APP.append(div.children[0]);

    const x = parseFloat(coordinates.split(',')[0]),
          y = parseFloat(coordinates.split(',')[1]);

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
            balloonContentHeader: ''
        }
    });

    myMap.geoObjects.add(objectManager);
}