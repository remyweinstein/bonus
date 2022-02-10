'use strict';

import * as Animate from '@/js/libs/animate.js'
import * as Router from '@/js/libs/router.js'
import * as Conn from '@/js/libs/connections.js'
import * as Util from '@/js/libs/functions.js'
import * as Conf from '@/js/config.js'
import * as Storage from '@/js/libs/storage.js'

export function modifyInput(el) {
  if (el.value.length === 1 && +el.value[0] === 8) el.value = "+7-";
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
  Router.run(Storage.getSection());
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
    Animate.animate({
      duration: 1000,
      timing: Animate.quad,
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
    document.getElementById("terms").getElementsByTagName("iframe")[0].src = Conf.TERMS_URL;
}

export function showRules() {
    document.getElementById("terms").style.display = "";
    document.getElementById("terms").getElementsByTagName("iframe")[0].src = Conf.RULES_URL;
}

export function remove(els) {
    els.forEach(function(item) {
        item.parentNode.removeChild(item);
    });
}