(function(){

    $.getJSON( "js/products.json", function( products ) {
        var items = [];
        products.forEach( product => {
            items.push( `
                <div>
                    <h2>${product.name}</h2>
                    <em>${product.price}</em><br/>
                    <img src="${product.picture}"/>
                </div>`
            );
        });
       
        $( "<section/>", {
            "class": "products",
            html: items.join( "" )
        }).appendTo( "body" );
      });



})();

/*paypal.Button.render({
    // Configure environment
    env: 'sandbox',
    client: {
        sandbox: 'AUykpVrNuc8Ngg4dFr45MlAlubVE_5ThVmTquYk1LTuDj1wlQLmOMFTrCShOTlkK7N9q6LMcmsB3H5x7',
        production: 'demo_production_client_id'
    },
    // Customize button (optional)
    locale: 'es_MX',
    style: {
        size: 'small',
        color: 'gold',
        shape: 'pill',
    },
    // Set up a payment
    payment: function (data, actions) {
        return actions.payment.create({
            transactions: [{
                amount: {
                    total: '300',
                    currency: 'MXN',
                },
                description: 'Pedido asombroso de 300 pesos',
                custom: '90048630024435',
                //invoice_number: '12345', Insert a unique invoice number
                payment_options: {
                    allowed_payment_method: 'INSTANT_FUNDING_SOURCE'
                },
                soft_descriptor: 'ECHI5786786',
                item_list: {
                    items: [
                    {
                        name: 'Sombrero',
                        description: 'Brown hat.',
                        quantity: '10',
                        price: '30',
                        sku: '1',
                        currency: 'MXN'
                    }
                    ]
                }
            }],
            note_to_payer: 'Contactenme en caso de algún error con el pedido.'
        });
    },
    // Execute the payment
    onAuthorize: function (data, actions) {
        return actions.payment.execute()
        .then(function () {
            // Show a confirmation message to the buyer
            window.alert('Thank you for your purchase!');
        });
    }
}, '#paypal-button');*/