export const cardImageW = 512;
export const cardImageH = 328;
export const cardImageSRC = "/assets/card_back.jpg";
export const LS_LINK = "LS_walletData_081221_01";
export const API_URL = "https://bonus.stolica-dv.ru/api";
//export const API_URL = "/api";
export const TERMS_URL = "/politika-konfidentsialnosti";
export const RULES_URL = "/pravila";
export const LS_TOKEN_LINK = "LS_BearerToken";
export const APP = document.querySelector(".main-app-space");
export const routes = {
    "adult": {
        hash: "#adult",
        title: ""
    },
    "intro": {
        hash: "#intro",
        title: ""
    },
    "registration": {
        hash: "#",
        title: "Регистрация",
        prevSection: "pre_registration"
    },
    "pre_registration": {
        hash: "#pre_registration",
        title: "Выбор города",
        prevSection: "intro"
    },
    "authorization": {
        hash: "#authorization",
        title: "Вход",
        prevSection: "intro"
    },
    "reset": {
        hash: "#reset",
        title: "Сброс пароля",
        prevSection: "authorization"
    },
    "personal": {
        hash: "#personal",
        title: "Профиль",
        showMenu: true
    },
    "wallet": {
        hash: "#wallet",
        title: "Кошелек",
        showMenu: true
    },
    "news": {
        hash: "#news",
        title: "Новости",
        showMenu: true
    },
    "refer": {
        hash: "#refer",
        title: "Приглашение",
        showMenu: true
    },
    "stores": {
        hash: "#stores",
        title: "Магазины",
        showMenu: true
    },
    "reg_success": {
        hash: "#reg_success",
        title: "Профиль"
    },
    "alerts": {
        hash: "#alerts",
        title: "Подписки и уведомления",
        showMenu: true
    },
    "personal_update": {
        hash: "#personal_update",
        title: "Смена данных",
        showMenu: true,
        prevSection: "personal"
    },
    "set_plastic": {
        hash: "#set_plastic",
        title: "Привязка карты",
        showMenu: true,
        prevSection: "personal_update"
    }
};