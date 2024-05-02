document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('newProductForm');
    let productIdCounter = getProductIdCounter();

    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // prevenir el envio del formulario

        // agarrar los valores del formulario
        const title = document.getElementById('title').value;
        const price = document.getElementById('price').value;
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;

        // chequear si todos los campos estan llenos
        if (!title || !price || !description || !category) {
            showAlert('All fields are required', 'danger');
            return;
        }

        // incrementar el contador de ID y asignarlo al producto
        const id = ++productIdCounter;
        console.log('ID:', id);
        console.log('Title:', title);
        console.log('Price:', price);
        console.log('Description:', description);
        console.log('Category:', category);

        // crear el objeto del producto
        const producto = {
            id,
            title,
            price,
            description,
            category,
        };

        // guardar el producto en el localStorage
        localStorage.setItem(`producto-${id}`, JSON.stringify(producto));
        showAlertSuccess(`Producto agregado con éxito. ID: ${id}`);
        // resetear el formulario
        form.reset();
    });

    // obtener el contador de ID desde el localStorage
    function getProductIdCounter() {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            const products = JSON.parse(storedProducts);
            return products.length;
        } else {
            return 0;
        }
    }

    // funcion para mostrar una alerta de Bootstrap
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} mt-3`;
        alertDiv.textContent = message;
        document.body.appendChild(alertDiv);

        // fade 3 segs
        setTimeout(function () {
            alertDiv.remove();
        }, 3000);
    }
    async function showAlertSuccess(message) {
        // si ya existe limpia la alert
        const existingAlert = document.querySelector('.alert-success');
        if (existingAlert) {
            existingAlert.remove();
        }

        // crear la alerta de exito
        const alertDiv = document.createElement('div');
        alertDiv.classList.add('alert', 'alert-success', 'mt-3', 'mb-0', 'alert-dismissible', 'fade', 'show');
        alertDiv.setAttribute('role', 'alert');
        const closeButton = document.createElement('button');
        closeButton.setAttribute('type', 'button');
        closeButton.classList.add('btn-close');
        closeButton.setAttribute('data-bs-dismiss', 'alert');
        closeButton.setAttribute('aria-label', 'Close');
        closeButton.addEventListener('click', function() {
            alertDiv.remove();
        });
        alertDiv.textContent = message;
        alertDiv.appendChild(closeButton);
        // agregar la alerta al contenedor
        document.getElementById('alerts').appendChild(alertDiv);
    }

    // funcion para mostrar los productos
    async function displayProducts() {
        try {
            let products = [];
            const storedProducts = localStorage.getItem('products');
            if (storedProducts) {
                products = JSON.parse(storedProducts);
            } else {
                const response = await fetch('https://fakestoreapi.com/products');
                products = await response.json();
                localStorage.setItem('products', JSON.stringify(products));
            }
            const data = products.map(product => {
                return {
                    id: product.id,
                    title: product.title,
                    price: `$${product.price}`,
                    description: product.description,
                    category: product.category,
                };
            });

            // renderizar la tabla con Grid.js
            new gridjs.Grid({
                columns: ['Title', 'Price', 'Description'],
                data: data,
                search: true,
                className: {
                    table: 'table table-striped table-bordered table-hover',
                    th: 'thead-dark'
                },
                language: {
                    'search': {
                        'placeholder': 'Search for products...'
                    }
                }
            }).render(document.getElementById('productList'));
        } catch (error) {
            console.error('Error fetching or displaying products:', error);
        }
    }

    // mostrar los productos
    displayProducts();
});
