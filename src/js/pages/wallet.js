'use strict';

import * as Storage from '@/js/libs/storage.js'
import * as Popup from '@/js/libs/popups.js'
import * as Animate from '@/js/libs/animate.js'
import * as Conf from '@/js/config.js'
import * as Util from '@/js/libs/functions.js'
import * as Geo from '@/js/libs/geo.js'

let walletUpdater = null;

export function updateWalletData(onlyBalance) {
    if (!onlyBalance) {
        onlyBalance = false;
    }
    
    let lastId = 0;
    let walletData = JSON.parse(localStorage.getItem(Conf.LS_LINK));
    
    
    if (walletData) {
        drawWalletData(walletData);
        drawPurchases(walletData.purchases);
        
        if (!onlyBalance) {
            if (walletData.purchases.length) {
                lastId = walletData.purchases[0].id;
            }
        }
    } else {
        walletData = {
            balance: 0,
            cardNumber: "",
            discount: 0,
            preferredDiscount: 0,
            discountValue: 0,
            purchases: []
        };
    }

    // Сперва подгружаем баланс и номер карты, затем отдельно транзакции
    getWalletData(lastId, onlyBalance).then(result => {
        if (result.status) {
            if (walletData.discountValue != result.data.discountValue || walletData.discount != result.data.discount || walletData.cardNumber != result.data.cardNumber || walletData.balance != result.data.balance || walletData.preferredDiscount != result.data.preferredDiscount) {
                walletData.cardNumber = result.data.cardNumber;
                walletData.balance = result.data.balance;
                walletData.discount = result.data.discount;
                walletData.preferredDiscount = result.data.preferredDiscount;
                walletData.discountValue = result.data.discountValue;
                drawWalletData(walletData);
            }

            // Кешируем чеки при появлении новых
            if (result.data.purchases && result.data.purchases.length) {
                walletData.purchases = result.data.purchases;
            }
            // Отрисовываем чеки из кеша или при появлении новых
            if ((onlyBalance && walletData.purchases.length) || (!onlyBalance && result.data.purchases.length)) {
                drawPurchases(walletData.purchases);
            }

            if (result.data.cardNumber) {
                localStorage.setItem(Conf.LS_LINK, JSON.stringify(walletData));
            }

            if (onlyBalance || localStorage.getItem("section") == "wallet") {
                walletUpdater = setTimeout(updateWalletData, 15000);
            }
        }
    }).catch(error => {
        console.warn(error);
        //Popup.showPopup("Внимание", "Произошла ошибка при загрузке транзакций, попробуйте позже.");
        if (onlyBalance || localStorage.getItem("section") == "wallet") walletUpdater = setTimeout(updateWalletData, 15000);
    });
}

function drawWalletData(walletData) {
    if (walletData.cardNumber && cardNumber.innerText != walletData.cardNumber) {
        cardNumber.innerText = walletData.cardNumber;
        Animate.animate({
            duration: 1000,
            timing: Animate.quad,
            draw: function (progress, options) {
                cardNumber.style.opacity = progress;
            },
            callback: function (options) { }
        });

        if (qrcode.codeNumber != walletData.cardNumber) {
            if (qrcode.children.length) {
                Util.removeChildrens(qrcode);
            }
            drawBonusCard(walletData.cardNumber);
        }
    }

    discountValue.innerText = walletData.discountValue + '%';

    let discountBalance = false;

    if (walletData.discount && walletData.preferredDiscount) {
        // Текущая: скидка, предпочитаемая: скидка
        cardType.innerText = "Дисконтная карта";
        cardInfo.innerText = "Ваша скидка";
        currencyType.innerText = "%";
        cardDataDiscount.style.display = "flex";
        // cardDataBonus.style.display = "none";
        discountBalance = true;
    } else if (!walletData.discount && !walletData.preferredDiscount) {
        // Текущая: бонусы, предпочитаемая: бонусы
        cardType.innerText = "Бонусная карта";
        cardInfo.innerText = "Баланс";
        currencyType.innerText = "бонусов";
        cardDataBonusPreffered.style.display = "none";
        // cardDataBonus.style.display = "none";
        cardDataDiscount.style.display = "none";
    } else if (!walletData.discount && walletData.preferredDiscount) {
        // Текущая: бонусы, предпочитаемая: скидка
        cardType.innerText = "Бонусная карта";
        cardInfo.innerText = "Баланс";
        currencyType.innerText = "бонусов";
        cardDataBonusPreffered.style.display = "none";
        // cardDataBonus.style.display = "none";
        cardDataDiscount.style.display = "none";
    } else if (walletData.discount && !walletData.preferredDiscount) {
        // Текущая: скидка, предпочитаемая: бонусы
        cardType.innerText = "Дисконтная карта";
        cardInfo.innerText = "Баланс";
        currencyType.innerText = "бонусов";
        // cardDataBonus.style.display = "flex";
        cardDataDiscount.style.display = "none";
    }

    if (walletData.discount != walletData.preferredDiscount) {
        changeDiscountSystem.style.display = "";
        changeDiscountSystemValue.innerText = (walletData.discount ? "БОНУСНОЙ" : "ДИСКОНТНОЙ");
    } else {
        changeDiscountSystem.style.display = "none";
        changeDiscountSystemValue.innerText = "";
    }

    let balance = (walletData.discount && discountBalance) ? walletData.discountValue : walletData.balance;

    if (balance != undefined) {
        if (bonuses.innerText != balance) {
            bonuses.classList.remove("load");
            Animate.animate({
                duration: 1000,
                timing: Animate.quad,
                draw: function (progress, options) {
                    bonuses.innerText = new Intl.NumberFormat('ru-RU').format(Number(Math.ceil(balance * progress)));
                    bonuses.style.opacity = progress;
                },
                callback: function (options) {
                    bonuses.innerText = new Intl.NumberFormat('ru-RU').format(Number(balance));
                }
            });
        }
    } else {
        bonuses.innerText = "Не удалось загрузить с сервера.";
    }
}

function drawPurchases(purchases) {
    Util.removeChildrens(transactions);

    purchases.forEach(purchase => {
        try {
            drawPurchase(purchase);
        } catch (error) {
            console.warn(error);
            Popup.showPopup("Внимание", "Произошла ошибка при визуализации транзакций, попробуйте позже.");
        }
    });
}

function drawPurchase(purchase) {
    // Контейнер
    let paymentElement = document.createElement("div");
    paymentElement.classList.add("payment");

    // Бонусы
    let paymentRowElement = null;
    let spanElement = null;

    // Всего скидка
    paymentRowElement = document.createElement("div");
    paymentRowElement.classList.add("payment-row");

    spanElement = document.createElement("span");
    spanElement.style.fontWeight = "bold";
    spanElement.innerText = "Всего скидка: ";
    paymentRowElement.appendChild(spanElement);

    spanElement = document.createElement("span");
    spanElement.classList.add("bad");
    spanElement.innerText = new Intl.NumberFormat('ru-RU').format(((Math.abs(Number(purchase.discount_amount)) + Math.abs(Number(purchase.payment_amount))) * -1)) + " руб";
    paymentRowElement.appendChild(spanElement);

    paymentElement.appendChild(paymentRowElement);
    
    // Из них бонусами
    paymentRowElement = document.createElement("div");
    paymentRowElement.classList.add("payment-row");

    spanElement = document.createElement("span");
    spanElement.classList.add("payment-amount");
    spanElement.style.fontWeight = "bold";
    spanElement.style.marginLeft = "20px";
    spanElement.innerText = "из них бонусами: ";
    paymentRowElement.appendChild(spanElement);

    spanElement = document.createElement("span");
    spanElement.classList.add("bad");
    spanElement.innerText = new Intl.NumberFormat('ru-RU').format(Number(purchase.payment_amount)) + " бонусов";
    paymentRowElement.appendChild(spanElement);

    paymentElement.appendChild(paymentRowElement);
    
    // Начислено бонусов
    paymentRowElement = document.createElement("div");
    paymentRowElement.classList.add("payment-row");

    spanElement = document.createElement("span");
    spanElement.classList.add("payment-amount");
    spanElement.style.fontWeight = "bold";
    spanElement.innerText = "Начислено бонусов: ";
    paymentRowElement.appendChild(spanElement);

    spanElement = document.createElement("span");
    spanElement.classList.add("good");
    spanElement.innerText = "+" + new Intl.NumberFormat('ru-RU').format(Number(purchase.cashback_amount)) + " бонусов"
    paymentRowElement.appendChild(spanElement);

    paymentElement.appendChild(paymentRowElement);

    // Дата
    paymentRowElement = document.createElement("div");
    paymentRowElement.classList.add("payment-row");

    spanElement = document.createElement("span");
    spanElement.classList.add("payment-amount");
    spanElement.innerText = "Дата: ";
    paymentRowElement.appendChild(spanElement);

    let date = new Date((purchase.operation_date).replace(new RegExp("-", 'g'), "/"));

    spanElement = document.createElement("span");
    spanElement.innerText =
        (["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"])[date.getDay()] + ", "
        + String(date.getDate()) + " "
        + (["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"])[date.getMonth()] + " "
        + String(date.getFullYear()) + " года, "
        + String(date.getHours()) + ":"
        + (String(date.getMinutes()).length == 1 ? "0" : "") + String(date.getMinutes()) + ":"
        + (String(date.getSeconds()).length == 1 ? "0" : "") + String(date.getSeconds());
    paymentRowElement.appendChild(spanElement);

    paymentElement.appendChild(paymentRowElement);

    // Источник начисления
    paymentRowElement = document.createElement("div");
    paymentRowElement.classList.add("payment-row");

    spanElement = document.createElement("span");
    spanElement.classList.add("payment-amount");
    spanElement.innerText = "Магазин: ";
    paymentRowElement.appendChild(spanElement);

    if (purchase.store_title && purchase.store_description) {
        paymentRowElement.appendChild(Geo.getGeolink(purchase.store_title, purchase.store_description));
    } else {
        spanElement = document.createElement("span");
        spanElement.innerText = purchase.store_title;
        paymentRowElement.appendChild(spanElement);
    }

    paymentElement.appendChild(paymentRowElement);

    // Детализация чека
    if (purchase.positions.length) {
        let paymentDetailsElement = document.createElement("details");
        paymentElement.appendChild(paymentDetailsElement);

        paymentRowElement = document.createElement("div");
        paymentRowElement.classList.add("payment-row");
        paymentRowElement.classList.add("neutral");
        paymentRowElement.classList.add("payment-details");
        paymentRowElement.classList.add("payment-header");
        ["Оплачено", "Скидка", "Начислено"].forEach(element => {
            let spanElement = document.createElement("span");
            spanElement.innerText = element;
            paymentRowElement.appendChild(spanElement);
        });
        paymentDetailsElement.appendChild(paymentRowElement);

        purchase.positions.forEach((position) => {
            paymentRowElement = document.createElement("div");
            paymentRowElement.classList.add("payment-row");
            paymentRowElement.classList.add("payment-details");
            paymentRowElement.classList.add("payment-header");

            let spanElement = undefined;
            spanElement = document.createElement("span");
            spanElement.innerText = new Intl.NumberFormat('ru-RU').format(Number(position.cost)) + " руб";
            spanElement.style.fontWeight = "bold";
            paymentRowElement.appendChild(spanElement);

            spanElement = document.createElement("span");
            if (Number(position.discount_amount)) {
                spanElement.innerText = new Intl.NumberFormat('ru-RU').format(Number(position.discount_amount) * -1) + " руб";
            } else {
                spanElement.innerText = new Intl.NumberFormat('ru-RU').format(Number(position.payment_amount)) + " бонусов";
            }

            paymentRowElement.appendChild(spanElement);
            paymentRowElement.classList.add("payment-position-amount");
            spanElement = document.createElement("span");
            spanElement.innerText = "+" + new Intl.NumberFormat('ru-RU').format(Number(position.cashback_amount)) + " бонусов";
            spanElement.style.fontWeight = "bold";
            paymentRowElement.appendChild(spanElement);

            paymentDetailsElement.appendChild(paymentRowElement);

            paymentRowElement = document.createElement("div");
            paymentRowElement.classList.add("payment-row");
            paymentRowElement.classList.add("payment-position");
            paymentRowElement.innerText = (position.product_title ? position.product_title : "Загрузка..");
            paymentDetailsElement.appendChild(paymentRowElement);
        });
    }

    transactions.appendChild(paymentElement);
}

function drawBonusCard(cardNumber) {
    let cardImage = new Image();
    cardImage.loaded = false;
    cardImage.src = Conf.cardImageSRC;
    cardImage.addEventListener("load", (e) => {

        let qrCanvas = document.createElement("canvas");
        let qr = new QRious({
            element: qrCanvas,
            size: 128,
            value: cardNumber,
            foreground: "#4062b7"
        });

        qrcode.cardNumber = cardNumber;
        qrcode.appendChild(qrCanvas);
        qrcode.style.display = "";
        Animate.animate({
            duration: 1000,
            timing: Animate.quad,
            draw: function (progress, options) {
                qrcode.style.opacity = progress;
            },
            callback: function (options) { }
        });

        let cardCanvas = document.createElement("canvas");
        cardCanvas.width = Conf.cardImageW;
        cardCanvas.height = Conf.cardImageH;

        let cardCanvasCtx = cardCanvas.getContext("2d");
        cardCanvasCtx.imageSmoothingEnabled = false;
        cardCanvasCtx.drawImage(cardImage, 0, 0, Conf.cardImageW, Conf.cardImageH);
        cardCanvasCtx.drawImage(qrCanvas, 192, 48, 128, 128);

        cardCanvasCtx.font = '32px sans-serif';
        cardCanvasCtx.textAlign = 'center';
        cardCanvasCtx.fillText(cardNumber.substr(0, 7), 256, 216);

        downloadCard.style.display = "";
        Animate.animate({
            duration: 1000,
            timing: Animate.quad,
            draw: function (progress, options) {
                downloadCard.style.opacity = progress;
            },
            callback: function (options) { }
        });

        downloadCard.addEventListener("click", () => {
            var dataURL = cardCanvas.toDataURL("image/jpeg");
            var link = document.createElement("a");
            link.href = dataURL;
            link.download = "Stolica - Bonus card - " + cardNumber + ".jpg";
            link.click();
        });
    });
}

async function getWalletData(lastId, onlyBalance) {
    if (!onlyBalance) onlyBalance = false;

    return fetch(Conf.API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": "Bearer " + Storage.getBearerToken()
        },
        body: JSON.stringify({
            "method": "getWalletData",
            "data": {
                "last_id": lastId,
                "only_balance": onlyBalance,
                "source": 'website'
            }
        })
    }).then(response => response.json()).catch(error => {
        return {
            status: false,
            description: error.message,
            error: error
        }
    });
}