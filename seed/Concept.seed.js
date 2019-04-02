"use strict";
exports.__esModule = true;
var concepts = ['Working', 'Holiday', 'Illness', 'Absence'];
exports["default"] = [
    {
        model: 'Product',
        documents: concepts.map(function (it) { return ({ name: it }); })
    }
];
