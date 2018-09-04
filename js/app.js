(function(){

    $.getJSON( "js/products.json", function( products ) {
        let itemsString = "";
        products.forEach( (product) => {
            itemsString += 
            `<div class="col-12 col-md-6 col-lg-4">
                <div class="card product" data-price="${product.price}" data-name="${product.name}">
                    <img class="card-img-top" src="${product.picture}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">$ ${product.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                        <a href="#" class="btn btn-primary add-to-cart">Add to Cart</a>
                    </div>
                </div>
            </div>` ;
        });
        $("#products").html(itemsString);
    });

    $("#products").on('click', '.add-to-cart', function(e){
        e.preventDefault();
        
        const $product = $(e.target).closest('.product');
        const name = $product.data('name');
        const price = $product.data('price');
        cart.addToCart(name, price);
    
    });

    $("#cartItems").on('click', '.remove', function(e){
        e.preventDefault();
        const index =$(e.target).data('index');
        cart.removeFromCart(index);
    });

    function Cart(){
        
        this.total = 0;
        this.items = [];
        
        this.addToCart = function(name, price) {
            this.items.push({
                price: price,
                name: name,
            });
            
            this.calculateTotal();
            this.updateButton();
            this.render();
        };

        this.removeFromCart = function(index) {
            this.items.splice(index,1);
            this.calculateTotal();
            this.updateButton();
            this.render();
        };
        
        this.calculateTotal = function(){
            this.total = this.items.reduce(function(sum, item) {
                return sum + item.price;
            }, 0);
        }
        
        this.render = function(){
            $('#cartTotal').html(` $ ${this.total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`);
            $('#modalTotal').html(` $ ${this.total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`);
            
            let itemsString = "";
            this.items.forEach( (product, index) => {
                itemsString +=  `
                <div>
                    <strong>${product.name}:</strong>
                    $ ${product.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                    <button data-index="${index}" class="btn btn-primary remove">Remove</button>
                </div>` ;
            });
            
            $("#cartItems").html(itemsString);
        }
        this.updateButton = function(){
    
            const items = this.items.map( item => {
                return  {
                    name: item.name,
                    quantity: '1',
                    price: item.price,
                    currency: 'MXN'
                }
            });
            
            const truncatedTotal = parseInt(this.total*100)/100;
            $('#paypal-button').empty();
            
            paypal.Button.render({
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
                                total: truncatedTotal,
                                currency: 'USD',
                            },
                            description: 'Pedido asombroso dela tienda de Levhita',
                            custom: '90048630024435',
                            //invoice_number: '12345', Insert a unique invoice number
                            payment_options: {
                                allowed_payment_method: 'INSTANT_FUNDING_SOURCE'
                            },
                            soft_descriptor: "Levhita's store",
                            item_list: { items: items }
                        }],
                        note_to_payer: 'Contácteme en caso de algún error con el pedido.'
                    });
                },
                // Execute the payment
                onAuthorize: function (data, actions) {
                    return actions.payment.execute()
                    .then(function () {
                        alert('Venta completada exitosamente');
                        cart.items=[];
                        cart.calculateTotal();
                        cart.render();
                    });
                }
            }, '#paypal-button');
        }
    }

    const cart = new Cart();
    cart.render();
})();

