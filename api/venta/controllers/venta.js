'use strict';

const stripe = require('stripe')('sk_test_51J3VjFC5R760vMtGfQUB1aN0S0wfquNYwX1OgGPVLhaMDeqb2gGKob1SRQZRabfY0rqKBqAmXUmM48Eo4JSYU9LB008oCVSErd')

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async create(ctx) {

        const { tokenStripe, products, idUser, direccionenvio } = ctx.request.body;
        let totalPagar = 0;
        products.forEach(product => {
            totalPagar += product.precio * product.quantity;
        });

        let datos = [];
        products.forEach(product => {
            datos.push(
                ` Compra: ${product.quantity} - ${product.clave} `
            )
        });

        let envio = `Recibe: ${direccionenvio.nombreapellido}, 
        Enviar a: ${direccionenvio.callenumero}, 
        ${direccionenvio.colonia}, ${direccionenvio.codigopostal},
        ${direccionenvio.ciudad}, ${direccionenvio.localidadmunicipio},
        ${direccionenvio.estado}, ${direccionenvio.telefono}, ${direccionenvio.celular}, 
        ${direccionenvio.referenciasdomicilio}`

        const charge = await stripe.charges.create({
            amount: totalPagar * 100,
            currency: 'mxn',
            source: tokenStripe,
            //description: `ID Usuario: ${idUser} mas: ${datos}`
            description: `${datos} ${'\n'}` +
                '\n' +
                `${envio}`
        })

        const createVenta = [];
        for await (const product of products) {
            const data = {
                product: product.id,
                user: idUser,
                pagototal: totalPagar,
                totalproducto: product.precio * product.quantity,
                cantidad: product.quantity,
                idpago: charge.id,
                direccionenvio
            };

            const validData = await strapi.entityValidator.validateEntityCreation(strapi.models.venta, data)
            const entry = await strapi.query("venta").create(validData)
            createVenta.push(entry)
        }
        return createVenta;
    }
};