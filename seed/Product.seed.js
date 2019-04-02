"use strict";
exports.__esModule = true;
var products = ['Microsoft', 'Facebook', 'Google', 'Github', 'Twitter'];
exports["default"] = [
    {
        model: 'Product',
        documents: products.map(function (it) { return ({ name: it }); })
    }
];
