'use strict';

export function mask(input, matrix, start=0, attr={}) {
    var keyCode,
        underlay = document.createElement('input');

    attr.placeholder = matrix;
    attr.disabled = "disabled";
    attr.type = input.getAttribute("type");
    
    for (let key in attr) {
        underlay.setAttribute(key, attr[key]);
    }
    
    underlay.classList.add("maskedHiddenInput","u-full-width");
    input.classList.add("maskedInput");
    input.setAttribute("placeholder", matrix);
    
    input.parentNode.insertBefore(underlay, input);
    
    function changePlaceholderForPhone(value) {
        return value + matrix.slice(value.length);
    }
    
    function maska(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < start) {
            event.preventDefault();
        }
        var i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function (a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
            });
        i = new_value.indexOf("_");
        if (i !== -1) {
            i < (start + 1) && (i = start);
            new_value = new_value.slice(0, i);
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g, function (a) {
            return "\\d{1," + a.length + "}";
        }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
            this.value = new_value;
        }
        
        if (event.type === "blur" && this.value.length < 5) {
            this.value = "";
        }
        
        underlay.setAttribute("placeholder", changePlaceholderForPhone(this.value));
    }

    input.addEventListener("input", maska, false);
    input.addEventListener("focus", maska, false);
    input.addEventListener("blur", maska, false);
    input.addEventListener("keydown", maska, false);
}