'use strict';

import { animate, quad } from '@/js/libs/animate.js'
import * as Router from '@/js/libs/router.js'
import * as Conn from '@/js/libs/connections.js'
import * as Util from '@/js/libs/functions.js'
import { TERMS_URL, RULES_URL } from '@/js/config.js'
import { getSection } from '@/js/libs/storage.js'

export function modifyInput(el) {
  if (el.value.length === 1 && +el.value[0] === 8) el.value = "+7-";
}

export function changeTabs(target) {
    const targetContent = document.querySelectorAll(".system_tabs-content-item-change")[(target.dataset.changeTab - 1)];
    addClass(target, "tab_h_active");
    addClass(targetContent, "tab_c_active");
    removeClass(siblings(target), "tab_h_active");
    removeClass(siblings(targetContent), "tab_c_active");
}

export function openNav() {
  document.getElementById("topnav").style.width = "100%";
}

export function closeNav() {
  document.getElementById("topnav").style.width = "0%";
}

export function removeChildrens(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function confirmAdult() {
  Router.run(getSection());
}

export function togglePassword(target) {
    let inpt = target.previousElementSibling;
    if (inpt.type === "password") {
        inpt.type = "text";
        target.style.color = "#4eb5e6";
        target.classList.add("icon-eye-off");
        target.classList.remove("icon-eye");
    } else{
        inpt.type = "password";
        target.style.color = "black";
        target.classList.remove("icon-eye-off");
        target.classList.add("icon-eye");
    }
}

export function showLoader() {
  loader.style.opacity = 1;
  loader.style.display = "";
}

export function hideLoader(instant) {
  if (instant === undefined) instant = false;

  if (instant) {
    loader.style.display = "none";
  } else {
    animate({
      duration: 1000,
      timing: quad,
      draw: function (progress, options) {
        loader.style.opacity = 1 - progress;
      },
      callback: function (options) {
        loader.style.display = "none";
      }
    });
  }
}

export function findFunction(functionName, context) {
    context = getContext(context);
    let args = Array.prototype.slice.call(arguments, 2),
        namespaces = functionName.split("."),
        func = namespaces.pop();
    
    for(var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    
    return context[func].apply(context, args);
}

function getContext(string) {
  switch (string) {
    default: {
        return null;
    }

    case "Router": {
        return Router;
    }
    case "Conn": {
        return Conn;
    }
    case "Util": {
        return Util;
    }
  }    
}

export function showTerms() {
    document.getElementById("terms").style.display = "";
    document.getElementById("terms").getElementsByTagName("iframe")[0].src = TERMS_URL;
}

export function showRules() {
    document.getElementById("terms").style.display = "";
    document.getElementById("terms").getElementsByTagName("iframe")[0].src = RULES_URL;
}

export function remove(els) {
    if (typeof els === 'string' || els instanceof String) {
        els = document.querySelectorAll(els);
    }
    if (!isNodeList(els) && !Array.isArray(els)) {
        els = [els];
    }
    els.forEach(function(item) {
        item.parentNode.removeChild(item);
    });
}

export function addClass(els, clas) {
    changeClass(els, clas, 'add');
}

export function removeClass(els, clas) {
    changeClass(els, clas, 'remove');
}

export function toggleClass(els, clas) {
    changeClass(els, clas, 'toggle');
}

function changeClass(els, clas, type) {
    if (!isNodeList(els) && !Array.isArray(els)) {
        els = [els];
    }
    els.forEach(function(item) {
        switch (type) {
            case "remove":
                item.classList.remove(clas);
                break;
            case "add":
                item.classList.add(clas);
                break;
            case "toggle":
                item.classList.toggle(clas);
                break;
            default:
                item.classList.toggle(clas);
        }
    });
}

function isNodeList(nodes) {
    return typeof nodes === 'object' &&
        /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(nodes)) &&
        (typeof nodes.length === 'number') &&
        (nodes.length === 0 || (typeof nodes[0] === "object" && nodes[0].nodeType > 0));
}

export let siblings = el => [].slice.call(el.parentNode.children).filter(child => (child !== el));

