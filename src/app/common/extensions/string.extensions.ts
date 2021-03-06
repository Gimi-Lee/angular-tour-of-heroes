// https://developer.mozilla.org
// https://www.npmjs.com/package/ts-polyfill

if (!String.prototype.hasOwnProperty('format')) {
    String.prototype.format = function () {
        if (arguments.length === 0) { return this; }
        let s = this;
        for (let i = 0; i < arguments.length; i++) {
            s = s.replace(new RegExp('\\{' + i + '\\}', 'g'), arguments[i]);
        }
        return s;
    };
}
if (!String.prototype.hasOwnProperty('startsWith')) {
    String.prototype.startsWith = function (str) {
        const reg = new RegExp(`^${str}`);
        return reg.test(this);
    };
}

if (!String.prototype.hasOwnProperty('endsWith')) {
    String.prototype.endsWith = function (str) {
        const reg = new RegExp(`${str}$`);
        return reg.test(this);
    };
}

// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
if (!String.prototype.hasOwnProperty('padStart')) {
    String.prototype.padStart = function padStart(targetLength, padString) {
        // tslint:disable-next-line: no-bitwise
        targetLength = targetLength >> 0; // floor if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        } else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length); // append to original to ensure we are longer than needed
            }
            return padString.slice(0, targetLength) + String(this);
        }
    };
}
if (!String.prototype.padEnd) {
    String.prototype.padEnd = function padEnd(targetLength, padString) {
        // tslint:disable-next-line: no-bitwise
        targetLength = targetLength >> 0; // floor if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString : ''));
        if (this.length > targetLength) {
            return String(this);
        } else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length); // append to original to ensure we are longer than needed
            }
            return String(this) + padString.slice(0, targetLength);
        }
    };
}
