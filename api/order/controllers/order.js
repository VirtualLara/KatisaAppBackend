'use strict';
const stripe = require('stripe')
    ('sk_test_51J3VjFC5R760vMtGfQUB1aN0S0wfquNYwX1OgGPVLhaMDeqb2gGKob1SRQZRabfY0rqKBqAmXUmM48Eo4JSYU9LB008oCVSErd');


/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async create(ctx) {
        console.log(ctx)
    }
};
