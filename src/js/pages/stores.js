'use strict';

import * as Popup from '@/js/libs/popups.js'
import * as Conf from '@/js/config.js'

export function updateStoresData() {
    if (!storesList.children.length) {
        let city_id = false;
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
            Popup.showPopup("Внимание", "Произошла ошибка, попробуйте позже.");
        });
    }
}

export function getStores() {
    return fetch(Conf.API_URL, {
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

    let response = await fetch(Conf.API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(body)
    });

    let result = await response.json();

    $("#storesList").html('');

    result.data.forEach(city => {
        $("#storesList").append("<div class='store_block' data-rsa='" + city.rsa_id + "' data-coordinates='" + city.coordinates + "' data-phone='" + city.phone + "' data-city='" + city.city_name + "'><div class='store_block-title'>" + city.store_name + "</div><div class='store_block-shedule'>" + city.shedule + "</div><span class='show_store'>></span></div>");
    });
}