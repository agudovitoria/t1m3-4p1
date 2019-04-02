const seeder :any = require('mongoose-seed');
const ProductModel :string = require('../src/api/persistence/ProductEntity.ts').default;
const ConceptModel :string = require('../src/api/persistence/ConceptEntity.ts').default;

const productSeeds :object = require('./Concept.seed.ts').default;
console.log(productSeeds);

const conceptSeeds :object = require('./Concept.seed.ts').default;
console.log(conceptSeeds);

const models :string[] = ['ProductModel', 'ConceptModel'];

// Connect to MongoDB via Mongoose
console.log('Connecting to mongo');
seeder.connect('mongodb://localhost:27017/t1m3-4pp', () :void => {
    console.log('Connected to mongo');
    // Load Mongoose models
    seeder.loadModels([ProductModel, ConceptModel]);
    // Clear specified collections
    seeder.clearModels(models, () :void => {
        console.log('Populating products');
        seeder.populateModels(productSeeds, () :void => {
            console.log('Populating concepts');
            seeder.populateModels(conceptSeeds, () :void => {
                console.log('Disonnecting from mongo');
                seeder.disconnect();
            });
        });
    });
});
