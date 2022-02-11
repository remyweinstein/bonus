'use strict';

import { showPopup } from '@/js/libs/popups.js'
import { API_URL } from '@/js/config.js'
import { getStoreToGeoMap } from '@/js/libs/geo.js'

export function render() {
    // Выбор города
    store_cities.addEventListener("change", (e) => {
        getStoresList(store_cities.value);
    });

    updateStoresData();
}

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
}