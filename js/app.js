(function(){

    $.getJSON( "js/products.json", function( products ) {
        const items = [];
        products.forEach( (product) => {
            items.push(
            `<div class="col-12 col-md-6 col-lg-4">
                <div class="card product" data-price="${product.price}" data-name="${product.name}">
                    <img class="card-img-top" src="${product.picture}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.price}</p>
                        <a href="#" class="btn btn-primary add-to-cart">Add to Cart</a>
                    </div>
                </div>
            </div>`
            );
        });
        $("#products").append(items.join( "" ));
    });


    $("#products").on('click', '.add-to-cart', function(e){
        const $product = $(e.target).closest('.product')
        const price = $product.data('price');
        const name = $product.data('name');
        console.log(price, name);
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