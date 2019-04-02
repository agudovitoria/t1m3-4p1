"use strict";
exports.__esModule = true;
var seeder = require('mongoose-seed');
var Product_seed_1 = require("./Product.seed");
var Concept_seed_1 = require("./Concept.seed");
var models = ['Products', 'Concepts'];
// Connect to MongoDB via Mongoose
console.log('Connecting to mongo');
seeder.connect('mongodb://localhost:27017/t1m3-4pp', function () {
    console.log('Connected to mongo');
    // Load Mongoose models
    seeder.loadModels([Product_seed_1["default"], Concept_seed_1["default"]]);
    // Clear specified collections
    seeder.clearModels(models, function () {
        console.log('Populating products');
        seeder.populateModels(Product_seed_1["default"], function () {
            console.log('Populating concepts');
            seeder.populateModels(Concept_seed_1["default"], function () {
                console.log('Disonnecting from mongo');
                seeder.disconnect();
            });
        });
    });
});
