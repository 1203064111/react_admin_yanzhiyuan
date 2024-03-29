'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toast = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wrapperId = 'toast-' + Math.random().toString(16).substring(2);
var defaultTimeout = 2000;
var defaultStyle = {
    container: {
        position: 'fixed',
        top: '60%',
        width: '100%',
        textAlign: 'center',
        zIndex:10000
    },
    text: {
        display: 'inline-block',
        margin: '0 3%',
        padding: '3%',
        fontSize: '14px',
        lineHeight: 'normal',
        textAlign: 'left',
        wordBreak: 'break-all',
        color: '#fff',
        background: '#000',
        borderRadius: '3px'
    }
};

function createWrapper() {
    var wrapper = document.createElement('div');
    wrapper.setAttribute('id', wrapperId);
    document.body.appendChild(wrapper);
}

function element(text, style) {
    return _react2.default.createElement(
        'div',
        { style: style.container },
        _react2.default.createElement(
            'span',
            { style: style.text },
            text
        )
    );
}

function mount(text, style) {
    (0, _reactDom.render)(element(text, style), document.getElementById(wrapperId));
}

function unmount() {
    (0, _reactDom.unmountComponentAtNode)(document.getElementById(wrapperId));
}

function show(text) {
    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultTimeout;
    var style = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultStyle;

    if (typeof text !== 'string') throw new Error('Toast text must be string.');
    if (typeof timeout !== 'number') throw new Error('Toast timeout must be number.');
    if ((typeof style === 'undefined' ? 'undefined' : _typeof(style)) !== 'object') throw new Error('Toast style must be object.');
    if (!document.getElementById(wrapperId)) createWrapper();
    if (!document.getElementById(wrapperId).hasChildNodes()) {
        mount(text, style);
        setTimeout(function () {
            return unmount();
        }, timeout);
    }
}

var toast = exports.toast = { show: show };