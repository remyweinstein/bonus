'use strict';

//import * as QRious from '@/js/vendor/qrious.min.js'
import * as Util from '@/js/libs/functions.js'
import * as Conn from '@/js/libs/connections.js'
import * as Popup from '@/js/libs/popups.js'
import * as Animate from '@/js/libs/animate.js'
import * as Storage from '@/js/libs/storage.js'

import * as Personal from '@/js/pages/personal.js'
import * as News from '@/js/pages/news.js'
import * as Stores from '@/js/pages/stores.js'
import * as Wallet from '@/js/pages/wallet.js'


let prevSection = null;
    
let sections = {
  "adult": {
      title: ""
  },
  "intro": {
      title: ""
  },
  "registration": {
    title: "Регистрация",
    prevSection: "pre_registration"
  },
  "pre_registration": {
    title: "Выбор города",
    prevSection: "intro"
  },
  "authorization": {
    title: "Вход",
    prevSection: "intro"
  },
  "reset": {
    title: "Сброс пароля",
    prevSection: "authorization"
  },
  "personal": {
    title: "Профиль",
    showMenu: true
  },
  "wallet": {
    title: "Кошелек",
    showMenu: true
  },
  "news": {
    title: "Новости",
    showMenu: true
  },
  "refer": {
    title: "Приглашение",
    showMenu: true
  },
  "stores": {
    title: "Магазины",
    showMenu: true
  },
  "reg_success": {
    title: "Профиль"
  },
  "alerts": {
    title: "Подписки и уведомления",
    showMenu: true
  },
  "personal_update": {
    title: "Смена данных",
    showMenu: true,
    prevSection: "personal"
  },
  "set_plastic": {
    title: "Привязка карты",
    showMenu: true,
    prevSection: "personal_update"
  }
};

export function routePrevSection() {
  let section = Storage.getSection();
  if (sections[section] && sections[section].prevSection) {
      drawSection(sections[section].prevSection);
  }
}

export function drawSection(section) {
  if (!section) section = "adult";
  prevSection = Storage.getSection();

  switch (section) {
    default: {
      break;
    }

    case "pre_registration": {
      Conn.updateCities();

      break;
    }

    case "registration": {
      Conn.updateCities().then(result => {
        registration_cont.style.display = "";
        reg_confirmation.style.display = "none";

        prem.checked = true;
        discount.checked = false;
        document.getElementById("loyalty-system").style.display = (city.options[city.options.selectedIndex].getAttribute("default-discount") === 0 ? "none" : "");  
      });

      break;
    }

    case "personal": {
      Personal.updatePersonalData();
      break;
    }

    case "stores": {
      Stores.updateStoresData();
      break;
    }

    case "wallet": {
      Wallet.updateWalletData();
      break;
    }

    case "refer": {
      renderReferSection();
      break;
    }

    case "reg_success": {
      //
      break;
    }

    case "news": {
      News.updateNews();
      break;
    }
  }

  let sectionsElements = document.getElementsByClassName("section");
  for (let i = 0; i < sectionsElements.length; i++) {
    if (sectionsElements[i].id === section) {
      sectionsElements[i].style.display = "";
      sectionsElements[i].scrollIntoView();
    } else {
      sectionsElements[i].style.display = "none";
    }
    Util.hideLoader();
  }

  document.getElementById("top-nav").style.display = (sections[section] && sections[section].title ? "" : "none");
  document.getElementById("top-nav-back").style.display = (sections[section] && sections[section].prevSection ? "" : "none");
  document.getElementById("top-nav-msg").style.display = (sections[section] && !sections[section].prevSection ? "" : "none");
  document.getElementById("top-nav-title").innerText = sections[section].title;
  document.getElementById("top-nav-menu").style.display = (sections[section] && sections[section].showMenu ? "" : "none");
  document.getElementById("top-nav-close").style.display = (["alerts"].indexOf(section) === -1 ? "none" : "");
  document.getElementById("bottom-nav").style.display = (sections[section] && sections[section].showMenu ? "" : "none");

  for (let i = 0; i < document.getElementById("bottom-nav").children.length; i++) {
    document.getElementById("bottom-nav").children[i].classList.remove("current-section");
    if (document.getElementById("bottom-nav").children[i].getAttribute("section") === section) document.getElementById("bottom-nav").children[i].classList.add("current-section");
  }

  Storage.setSection(section);
}

export function renderReferSection() {
  Conn.getReferLink().then((response) => {
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
        Animate.animate({
          duration: 1000,
          timing: Animate.quad,
          draw: function (progress, options) {
            qrCanvas.style.opacity = progress;
            referLink.style.opacity = progress;
          },
          callback: function (options) { }
        });

        referLinkTG.setAttribute("href", "https://t.me/share/url?url=" + response.data.link + "&text=Столица: бонусы&utm_source=ref_tg");
        referLinkWA.setAttribute("href", "https://api.whatsapp.com/send?text=Столица: бонусы " + response.data.link + "&utm_source=ref_wa");
      }

      if (response.data.referrals && response.data.referrals.length) response.data.referrals.forEach((ref_row) => {
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
        if (ref_row.gifted) td.style.fontWeight = "bold";
        td.innerText = (ref_row.gifted ? "+" + ref_row.referral_gift : "n/a");
        td.classList.add(ref_row.gifted ? "good" : "bad");
        tr.appendChild(td);

        referrals.appendChild(tr);
      });
    }
  });
}