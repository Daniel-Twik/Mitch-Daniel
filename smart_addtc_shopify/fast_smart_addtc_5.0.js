
// init global variables:

// CSS selector for each product, initialized by product_finder()
let page_products_selector;



// init functions:

function Get(yourUrl) {
    var Httpreq = new XMLHttpRequest();
    async: true;
    Httpreq.open("GET", yourUrl, false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}


function init_icon_cdn() {
    let icon_style = document.createElement("link");
    icon_style.setAttribute("rel", "stylesheet");
    icon_style.setAttribute("href", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
    document.head.appendChild(icon_style);
}


// updates page_products_selector with product selector values
function product_finder() {
    /******/ (function(modules) { // webpackBootstrap
    /******/ 	// The module cache
    /******/ 	var installedModules = {};
    /******/
    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {
    /******/
    /******/ 		// Check if module is in cache
    /******/ 		if(installedModules[moduleId]) {
    /******/ 			return installedModules[moduleId].exports;
    /******/ 		}
    /******/ 		// Create a new module (and put it into the cache)
    /******/ 		var module = installedModules[moduleId] = {
    /******/ 			i: moduleId,
    /******/ 			l: false,
    /******/ 			exports: {}
    /******/ 		};
    /******/
    /******/ 		// Execute the module function
    /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ 		// Flag the module as loaded
    /******/ 		module.l = true;
    /******/
    /******/ 		// Return the exports of the module
    /******/ 		return module.exports;
    /******/ 	}
    /******/
    /******/
    /******/ 	// expose the modules object (__webpack_modules__)
    /******/ 	__webpack_require__.m = modules;
    /******/
    /******/ 	// expose the module cache
    /******/ 	__webpack_require__.c = installedModules;
    /******/
    /******/ 	// define getter function for harmony exports
    /******/ 	__webpack_require__.d = function(exports, name, getter) {
    /******/ 		if(!__webpack_require__.o(exports, name)) {
    /******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
    /******/ 		}
    /******/ 	};
    /******/
    /******/ 	// define __esModule on exports
    /******/ 	__webpack_require__.r = function(exports) {
    /******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    /******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    /******/ 		}
    /******/ 		Object.defineProperty(exports, '__esModule', { value: true });
    /******/ 	};
    /******/
    /******/ 	// create a fake namespace object
    /******/ 	// mode & 1: value is a module id, require it
    /******/ 	// mode & 2: merge all properties of value into the ns
    /******/ 	// mode & 4: return value when already ns object
    /******/ 	// mode & 8|1: behave like require
    /******/ 	__webpack_require__.t = function(value, mode) {
    /******/ 		if(mode & 1) value = __webpack_require__(value);
    /******/ 		if(mode & 8) return value;
    /******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
    /******/ 		var ns = Object.create(null);
    /******/ 		__webpack_require__.r(ns);
    /******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    /******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
    /******/ 		return ns;
    /******/ 	};
    /******/
    /******/ 	// getDefaultExport function for compatibility with non-harmony modules
    /******/ 	__webpack_require__.n = function(module) {
    /******/ 		var getter = module && module.__esModule ?
    /******/ 			function getDefault() { return module['default']; } :
    /******/ 			function getModuleExports() { return module; };
    /******/ 		__webpack_require__.d(getter, 'a', getter);
    /******/ 		return getter;
    /******/ 	};
    /******/
    /******/ 	// Object.prototype.hasOwnProperty.call
    /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
    /******/
    /******/ 	// __webpack_public_path__
    /******/ 	__webpack_require__.p = "";
    /******/
    /******/
    /******/ 	// Load entry module and return exports
    /******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/productFinder.js");
    /******/ })
    /************************************************************************/
    /******/ ({

    /***/ "./node_modules/@medv/finder/finder.js":
    /*!*********************************************!*\
    !*** ./node_modules/@medv/finder/finder.js ***!
    \*********************************************/
    /*! exports provided: finder */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {

    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "finder", function() { return finder; });
    var Limit;
    (function (Limit) {
        Limit[Limit["All"] = 0] = "All";
        Limit[Limit["Two"] = 1] = "Two";
        Limit[Limit["One"] = 2] = "One";
    })(Limit || (Limit = {}));
    let config;
    let rootDocument;
    function finder(input, options) {
        if (input.nodeType !== Node.ELEMENT_NODE) {
            throw new Error(`Can't generate CSS selector for non-element node type.`);
        }
        if ("html" === input.tagName.toLowerCase()) {
            return "html";
        }
        const defaults = {
            root: document.body,
            idName: (name) => true,
            className: (name) => true,
            tagName: (name) => true,
            attr: (name, value) => false,
            seedMinLength: 1,
            optimizedMinLength: 2,
            threshold: 1000,
            maxNumberOfTries: 10000,
        };
        config = Object.assign(Object.assign({}, defaults), options);
        rootDocument = findRootDocument(config.root, defaults);
        let path = bottomUpSearch(input, Limit.All, () => bottomUpSearch(input, Limit.Two, () => bottomUpSearch(input, Limit.One)));
        if (path) {
            const optimized = sort(optimize(path, input));
            if (optimized.length > 0) {
                path = optimized[0];
            }
            return selector(path);
        }
        else {
            throw new Error(`Selector was not found.`);
        }
    }
    function findRootDocument(rootNode, defaults) {
        if (rootNode.nodeType === Node.DOCUMENT_NODE) {
            return rootNode;
        }
        if (rootNode === defaults.root) {
            return rootNode.ownerDocument;
        }
        return rootNode;
    }
    function bottomUpSearch(input, limit, fallback) {
        let path = null;
        let stack = [];
        let current = input;
        let i = 0;
        while (current && current !== config.root.parentElement) {
            let level = maybe(id(current)) || maybe(...attr(current)) || maybe(...classNames(current)) || maybe(tagName(current)) || [any()];
            const nth = index(current);
            if (limit === Limit.All) {
                if (nth) {
                    level = level.concat(level.filter(dispensableNth).map(node => nthChild(node, nth)));
                }
            }
            else if (limit === Limit.Two) {
                level = level.slice(0, 1);
                if (nth) {
                    level = level.concat(level.filter(dispensableNth).map(node => nthChild(node, nth)));
                }
            }
            else if (limit === Limit.One) {
                const [node] = level = level.slice(0, 1);
                if (nth && dispensableNth(node)) {
                    level = [nthChild(node, nth)];
                }
            }
            for (let node of level) {
                node.level = i;
            }
            stack.push(level);
            if (stack.length >= config.seedMinLength) {
                path = findUniquePath(stack, fallback);
                if (path) {
                    break;
                }
            }
            current = current.parentElement;
            i++;
        }
        if (!path) {
            path = findUniquePath(stack, fallback);
        }
        return path;
    }
    function findUniquePath(stack, fallback) {
        const paths = sort(combinations(stack));
        if (paths.length > config.threshold) {
            return fallback ? fallback() : null;
        }
        for (let candidate of paths) {
            if (unique(candidate)) {
                return candidate;
            }
        }
        return null;
    }
    function selector(path) {
        let node = path[0];
        let query = node.name;
        for (let i = 1; i < path.length; i++) {
            const level = path[i].level || 0;
            if (node.level === level - 1) {
                query = `${path[i].name} > ${query}`;
            }
            else {
                query = `${path[i].name} ${query}`;
            }
            node = path[i];
        }
        return query;
    }
    function penalty(path) {
        return path.map(node => node.penalty).reduce((acc, i) => acc + i, 0);
    }
    function unique(path) {
        switch (rootDocument.querySelectorAll(selector(path)).length) {
            case 0:
                throw new Error(`Can't select any node with this selector: ${selector(path)}`);
            case 1:
                return true;
            default:
                return false;
        }
    }
    function id(input) {
        const elementId = input.getAttribute("id");
        if (elementId && config.idName(elementId)) {
            return {
                name: "#" + cssesc(elementId, { isIdentifier: true }),
                penalty: 0,
            };
        }
        return null;
    }
    function attr(input) {
        const attrs = Array.from(input.attributes).filter((attr) => config.attr(attr.name, attr.value));
        return attrs.map((attr) => ({
            name: "[" + cssesc(attr.name, { isIdentifier: true }) + "=\"" + cssesc(attr.value) + "\"]",
            penalty: 0.5
        }));
    }
    function classNames(input) {
        const names = Array.from(input.classList)
            .filter(config.className);
        return names.map((name) => ({
            name: "." + cssesc(name, { isIdentifier: true }),
            penalty: 1
        }));
    }
    function tagName(input) {
        const name = input.tagName.toLowerCase();
        if (config.tagName(name)) {
            return {
                name,
                penalty: 2
            };
        }
        return null;
    }
    function any() {
        return {
            name: "*",
            penalty: 3
        };
    }
    function index(input) {
        const parent = input.parentNode;
        if (!parent) {
            return null;
        }
        let child = parent.firstChild;
        if (!child) {
            return null;
        }
        let i = 0;
        while (child) {
            if (child.nodeType === Node.ELEMENT_NODE) {
                i++;
            }
            if (child === input) {
                break;
            }
            child = child.nextSibling;
        }
        return i;
    }
    function nthChild(node, i) {
        return {
            name: node.name + `:nth-child(${i})`,
            penalty: node.penalty + 1
        };
    }
    function dispensableNth(node) {
        return node.name !== "html" && !node.name.startsWith("#");
    }
    function maybe(...level) {
        const list = level.filter(notEmpty);
        if (list.length > 0) {
            return list;
        }
        return null;
    }
    function notEmpty(value) {
        return value !== null && value !== undefined;
    }
    function* combinations(stack, path = []) {
        if (stack.length > 0) {
            for (let node of stack[0]) {
                yield* combinations(stack.slice(1, stack.length), path.concat(node));
            }
        }
        else {
            yield path;
        }
    }
    function sort(paths) {
        return Array.from(paths).sort((a, b) => penalty(a) - penalty(b));
    }
    function* optimize(path, input, scope = {
        counter: 0,
        visited: new Map()
    }) {
        if (path.length > 2 && path.length > config.optimizedMinLength) {
            for (let i = 1; i < path.length - 1; i++) {
                if (scope.counter > config.maxNumberOfTries) {
                    return; // Okay At least I tried!
                }
                scope.counter += 1;
                const newPath = [...path];
                newPath.splice(i, 1);
                const newPathKey = selector(newPath);
                if (scope.visited.has(newPathKey)) {
                    return;
                }
                if (unique(newPath) && same(newPath, input)) {
                    yield newPath;
                    scope.visited.set(newPathKey, true);
                    yield* optimize(newPath, input, scope);
                }
            }
        }
    }
    function same(path, input) {
        return rootDocument.querySelector(selector(path)) === input;
    }
    const regexAnySingleEscape = /[ -,\.\/:-@\[-\^`\{-~]/;
    const regexSingleEscape = /[ -,\.\/:-@\[\]\^`\{-~]/;
    const regexExcessiveSpaces = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g;
    const defaultOptions = {
        "escapeEverything": false,
        "isIdentifier": false,
        "quotes": "single",
        "wrap": false
    };
    function cssesc(string, opt = {}) {
        const options = Object.assign(Object.assign({}, defaultOptions), opt);
        if (options.quotes != "single" && options.quotes != "double") {
            options.quotes = "single";
        }
        const quote = options.quotes == "double" ? "\"" : "'";
        const isIdentifier = options.isIdentifier;
        const firstChar = string.charAt(0);
        let output = "";
        let counter = 0;
        const length = string.length;
        while (counter < length) {
            const character = string.charAt(counter++);
            let codePoint = character.charCodeAt(0);
            let value = void 0;
            // If it’s not a printable ASCII character…
            if (codePoint < 0x20 || codePoint > 0x7E) {
                if (codePoint >= 0xD800 && codePoint <= 0xDBFF && counter < length) {
                    // It’s a high surrogate, and there is a next character.
                    const extra = string.charCodeAt(counter++);
                    if ((extra & 0xFC00) == 0xDC00) {
                        // next character is low surrogate
                        codePoint = ((codePoint & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000;
                    }
                    else {
                        // It’s an unmatched surrogate; only append this code unit, in case
                        // the next code unit is the high surrogate of a surrogate pair.
                        counter--;
                    }
                }
                value = "\\" + codePoint.toString(16).toUpperCase() + " ";
            }
            else {
                if (options.escapeEverything) {
                    if (regexAnySingleEscape.test(character)) {
                        value = "\\" + character;
                    }
                    else {
                        value = "\\" + codePoint.toString(16).toUpperCase() + " ";
                    }
                }
                else if (/[\t\n\f\r\x0B]/.test(character)) {
                    value = "\\" + codePoint.toString(16).toUpperCase() + " ";
                }
                else if (character == "\\" || !isIdentifier && (character == "\"" && quote == character || character == "'" && quote == character) || isIdentifier && regexSingleEscape.test(character)) {
                    value = "\\" + character;
                }
                else {
                    value = character;
                }
            }
            output += value;
        }
        if (isIdentifier) {
            if (/^-[-\d]/.test(output)) {
                output = "\\-" + output.slice(1);
            }
            else if (/\d/.test(firstChar)) {
                output = "\\3" + firstChar + " " + output.slice(1);
            }
        }
        // Remove spaces after `\HEX` escapes that are not followed by a hex digit,
        // since they’re redundant. Note that this is only possible if the escape
        // sequence isn’t preceded by an odd number of backslashes.
        output = output.replace(regexExcessiveSpaces, function ($0, $1, $2) {
            if ($1 && $1.length % 2) {
                // It’s not safe to remove the space, so don’t.
                return $0;
            }
            // Strip the space.
            return ($1 || "") + $2;
        });
        if (!isIdentifier && options.wrap) {
            return quote + output + quote;
        }
        return output;
    }


    /***/ }),

    /***/ "./src/scripts/productFinder.js":
    /*!**************************************!*\
    !*** ./src/scripts/productFinder.js ***!
    \**************************************/
    /*! no exports provided */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {

    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ var _medv_finder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @medv/finder */ "./node_modules/@medv/finder/finder.js");
    function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


    var SYMBOLS = ["\\$", "\u062F.\u0625", "NA\u0192", "\u0192", "\u09F3", ".\u062F.\u0628", "\xA5", "Col$", "\u20A1", "K\u010D", "RD$", "\u062F.\u062C", "\xA3", "\u20AC", "FJ$", "\xA3", "\xA3", "GH\u20B5", "\xA3", "GY$", "HK$", "\u20AA", "\u20B9", "\u062F.\u0639", "J$", "\xA5", "\u0441\u043E\u043C", "\u17DB", "KY$", "\xA3", "L$", "\u20AE", "N$", "\u20A6", "C$", "NZ$", "\u20B1", "z\u0142", "\u20B2", "SI$", "S$", "\xA3", "\u0E3F", "TT$", "NT$", "US$", "$U", "\u20AB", "WS$", "EC$", "Z$"];
    var ISOS = ["AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL", "BSD", "BTN", "BWP", "BYR", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY", "COP", "CRC", "CUC", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EEK", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GHS", "GIP", "GMD", "GNF", "GQE", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "INR", "IQD", "IRR", "ISK", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LTL", "LVL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRO", "MUR", "MVR", "MWK", "MXN", "MYR", "MZM", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLL", "SOS", "SRD", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VEB", "VND", "VUV", "WST", "XAF", "XCD", "XDR", "XOF", "XPF", "YER", "ZAR", "ZMK", "ZWR"];
    var TAGS = ['DIV', 'MAIN', 'SECTION', 'UL', 'OL', 'LI', 'FORM', 'ARTICLE'];

    function filterTags(elements) {
    return elements.filter(function (el) {
        return TAGS.includes(el.nodeName);
    });
    }

    function filterMaxCurrency(elements) {
    var currenciesToElementsMap = _objectSpread(_objectSpread({}, mapElementsToCurrencies(elements, ISOS)), mapElementsToCurrencies(elements, SYMBOLS));

    var maxCount = 0,
        maxCurrency = '';

    for (var c in currenciesToElementsMap) {
        var _maxCount = currenciesToElementsMap[c].reduce(function (acc, _ref) {
        var count = _ref.count;
        return acc + count;
        }, 0);

        if (_maxCount > maxCount) {
        maxCount = _maxCount;
        maxCurrency = c;
        }
    }

    return currenciesToElementsMap[maxCurrency].map(function (_ref2) {
        var el = _ref2.el;
        return el;
    });
    }

    function mapElementsToCurrencies(elements, collection) {
    var currenciesToElements = {};
    elements.forEach(function (el) {
        var count = 0;
        var item;
        collection.forEach(function (c) {
        var rgx = collection === ISOS ? "\\b".concat(c, "\\b") : c;
        var match = el.innerText.match(new RegExp(rgx, 'g'));
        match = match && match.length || 0;
        match *= 6;

        if (match > count) {
            count = match;
            item = c;
        }
        });

        if (count > 0) {
        currenciesToElements[item] = currenciesToElements[item] ? currenciesToElements[item].concat({
            el: el,
            count: count
        }) : [{
            el: el,
            count: count
        }];
        }
    });
    return currenciesToElements;
    }

    function getLargerElement(elements) {
    var largest,
        differentSize = false,
        size = 0;
    elements.forEach(function (el, index) {
        var rect = el.getBoundingClientRect();

        var _size = rect.height + rect.width;

        if (index > 0 && Math.abs(_size - size) > 200) {
        differentSize = true;
        }

        if (_size - 200 > size) {
        largest = el;
        size = _size;
        }
    });
    return differentSize && largest;
    }

    function getCommonSelector(elements) {
    var tags = {};
    elements.forEach(function (el) {
        if (el.clientHeight === 0) return;
        if (tags[el.nodeName]) tags[el.nodeName].push(el);else tags[el.nodeName] = [el];
    });
    var maxCount = 0,
        tagName = '',
        commonClasses = [],
        classStr = '';
    Object.keys(tags).forEach(function (tag) {
        if (tags[tag].length > maxCount) {
        maxCount = tags[tag].length;
        tagName = tag;
        tags[tag].forEach(function (el) {
            var classList = Array.from(el.classList);

            if (commonClasses.length) {
            commonClasses = commonClasses.filter(function (className) {
                return classList.includes(className);
            });
            } else {
            commonClasses = classList;
            }
        });
        }
    });

    if (commonClasses.length) {
        classStr = commonClasses.reduce(function (acc, val) {
        return isNaN(val[0]) ? acc + '.' + val : acc;
        }, '');
    }

    return tagName + classStr;
    }

    ;

    function search() {
    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
    var children = Array.from(target.children);
    children = filterTags(children);
    children = filterMaxCurrency(children);
    if (children.length === 0) return false;else if (children.length === 1) return search(children[0]);
    var largestElement = getLargerElement(children);
    return largestElement ? search(largestElement) : Object(_medv_finder__WEBPACK_IMPORTED_MODULE_0__["finder"])(target) + ' ' + getCommonSelector(children);
    }

    ;
    var cssSelector = search();
    console.log('Selector:', cssSelector);
    console.dir(document.querySelectorAll(cssSelector));

    // global:
    page_products_selector = cssSelector;
    

    /***/ })

    /******/ });
}


function create_addtc_buttons(selector) {
    let prods = document.querySelectorAll(selector);
    for (let prod in prods) {
        let temp_item = prods[prod];
        let temp_item_height = temp_item.offsetHeight;
        let temp_item_position = window.getComputedStyle(temp_item, null).getPropertyValue("position");

        // search for url that takes us to items's product page and append ".json"
        let data_url = create_data_finding_url(selector, prod); // done

        // create addtc button
        let add_btn = document.createElement('div');
        add_btn.innerHTML = `
        <button class="tw-subtract" onclick="">-</button>
        <button>
            <a class="tw-add-a">Add 
                <span class="tw-qty">1</span> 
            to cart</a>
        </button>
        <button class="tw-increase" onclick="">+</button>
        `;
        add_btn.classList.add("tw-add-wrap");
        add_btn.style.position = 'absolute';
        add_btn.style.display = 'flex';

        // append button to item
        temp_item.appendChild(add_btn);        

        add_btn.firstElementChild.nextElementSibling.firstElementChild.setAttribute('tw-ref', data_url);

        add_btn.style.position = 'relative';

        // on any add button click
        add_btn.firstElementChild.nextElementSibling.firstElementChild.onclick = function() {
            let data = Get(data_url);
            let qty = add_btn.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.innerText;
            add_btn.firstElementChild.nextElementSibling.firstElementChild.innerText = "Adding...";
            setTimeout(function(){ 
                // sort through product data for variant id and then trigger addtc
                find_and_add_product(data, qty);
            }, 1000);
        }

        // on any - button click
        add_btn.firstElementChild.onclick = function() {
            let current_qty = parseInt(add_btn.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.innerText);
            if (current_qty > 1) {
                current_qty--;
                add_btn.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.innerText = String(current_qty);
            }
        }

        // on any + button click
        add_btn.lastElementChild.onclick = function() {
            let current_qty = parseInt(add_btn.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.innerText);
            current_qty++;
            add_btn.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.innerText = String(current_qty);
        }
    }
}


// given a product, finds the url for the JSON representation of the product page
function create_data_finding_url(selector, item_num) {
    let prod = document.querySelectorAll(selector)[item_num];
    let prod_str = prod.innerHTML;
    let href;

    let re = /href=".+"/gi;
    if (re.test(prod_str) == true) {
        href = prod_str.match(re)[0];
        if (href.indexOf(" ") != -1) {
            href = href.substring(0, href.indexOf(" "));
        }
    }

    // removes gibberish from url:
    href = href.substring(href.indexOf('"') + 1, href.lastIndexOf('"'));

    if (href.indexOf('.co.') != -1) {
        href = href.substring(href.indexOf("/"), href.length);
    }

    if (href.indexOf('?') != -1) {
        href = href.substring(0, href.indexOf("?"));
    }

    href = href + ".json"
    return href;
}


// sort through product data for variant id and then trigger addtc
function find_and_add_product(json_str, qty) {
    json_data = JSON.parse(json_str);
    let variant_id = json_data['product']['variants'][0]['id'];
        
    // cart is initialized and permalink works
    if (document.cookie.indexOf("cart=") != -1) {

        let prod_chain = "/cart/" + variant_id + ":" + qty;
        
        // check for other previous cart items
        let prev_item_chain = find_prev_cart_data();

        // append previous cart items to our addtc url
        if (prev_item_chain.length > 1) {
            prod_chain = prod_chain + "," + prev_item_chain;
        }

        // add all previous and new items in 1 request
        console.log(prod_chain);

        Get(prod_chain);

        location.reload();
    } 
    // cart not initialized, must use form instead of permalink and open new tab
    // only for the first addtc - after this the cart is initiated
    else{
        let form_wrap = document.createElement("div");
        form_wrap.innerHTML = `
        <form method="post" action="/cart/add">
            <input type="hidden" name="id" value="` + variant_id + `" />
            <input min="1" type="number" id="quantity" name="quantity" value="` + qty +`"/>
            <input type="submit" id="tw-submit" value="Add to cart" class="btn" />
        </form> 
        `;
        form_wrap.style.display = 'none';
        document.body.appendChild(form_wrap);

        sessionStorage.setItem("tw_cart_init", "YES");
        document.getElementById("tw-submit").click();

    }
}


// check for other previous cart items and add them to our addtc url
function find_prev_cart_data() {
    let cart = Get("/cart.json");
    let variant_ids_pre;
    let variant_ids_final = [];
    let quantities_final = [];
    let re = /variant_id":[0-9]*/gi;
    let re2 = /quantity":[0-9]*/gi;
    if (re.test(cart) == true) {
        variant_ids_pre = cart.match(re);
        quantities_final = cart.match(re2);
    }

    // remove "variant_id":" from each list item
    if (variant_ids_pre) {
        for (v_id in variant_ids_pre) {
            variant_ids_final.push(variant_ids_pre[v_id].substring(12, variant_ids_pre[v_id].length) + ":" + quantities_final[v_id].substring(10, quantities_final[v_id].length));
        }
    }

    // return string version of our addtc url pattern
    return variant_ids_final.join();
}



// run script:

init_icon_cdn();

// find and store page_products_selector:
product_finder();

create_addtc_buttons(page_products_selector);

