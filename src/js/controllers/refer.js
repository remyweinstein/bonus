'use strict';

import { getReferLink } from '@/js/libs/connections.js'
import { animate, quad } from '@/js/libs/animate.js'

export function render() {
    renderReferSection();
}

function renderReferSection() {
    getReferLink().then((response) => {
        if (response.status) {
            if (!referQr.children.length) {
                let qrCanvas = document.createElement("canvas");
                qrCanvas.style.opacity = 0;
                let qr = new QRious({
                    element: qrCanvas,
                    size: 192,
                    value: response.data.link
                });
                referQr.appendChild(qrCanvas);

                referLink.style.display = "";
                animate({
                    duration: 1000,
                    timing: quad,
                    draw: function (progress, options) {
                        qrCanvas.style.opacity = progress;
                        referLink.style.opacity = progress;
                    },
                    callback: function (options) { }
                });

                referLinkTG.setAttribute("href", "https://t.me/share/url?url=" + response.data.link + "&text=Столица: бонусы&utm_source=ref_tg");
                referLinkWA.setAttribute("href", "https://api.whatsapp.com/send?text=Столица: бонусы " + response.data.link + "&utm_source=ref_wa");
            }

            if (response.data.referrals && response.data.referrals.length)
                response.data.referrals.forEach((ref_row) => {
                    let tr = document.createElement("tr");

                    let td = document.createElement("td");
                    td.innerText = ref_row.last_sync;
                    tr.appendChild(td);

                    td = document.createElement("td");
                    td.innerText = "7-***-***-" + ref_row.phone;
                    tr.appendChild(td);

                    td = document.createElement("td");
                    td.innerText = (ref_row.gifted ? "Совершена покупка" : "Регистрация по приглашению");
                    tr.appendChild(td);

                    td = document.createElement("td");
                    if (ref_row.gifted)
                        td.style.fontWeight = "bold";
                    td.innerText = (ref_row.gifted ? "+" + ref_row.referral_gift : "n/a");
                    td.classList.add(ref_row.gifted ? "good" : "bad");
                    tr.appendChild(td);

                    referrals.appendChild(tr);
                });
        }
    });
}