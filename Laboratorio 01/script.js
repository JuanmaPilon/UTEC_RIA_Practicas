document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('newProductForm');

    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // para que no me mande el envio de formulario

       // agarro los valores guachen
        const title = document.getElementById('title').value;
        const price = document.getElementById('price').value;
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;

        
       // checkeo
       if (!title || !price || !description || !category) {
        showAlert('All fields are required', 'danger');
        return;
    }
    console.log('Title:', title);
    console.log('Price:', price);
    console.log('Description:', description);
    console.log('Category:', category);


        // me creo el productito pal local
        const producto = {
            title,
            price,
            description,
            category,
        };
        
        localStorage.setItem('producto', JSON.stringify(producto));
        // primero guardo en local storage y luego de eso intento hacer la peticion a la api
        try {
            const response = await fetch('https://fakestoreapi.com/products', {
                method: 'POST',
            });
            const data = await response.json();
            console.log('Producto creado:', data);
        } catch (error) {
            showAlert('Error al crear el producto', 'danger');
            console.error('Error:', error);
        }
        // reseteo
        form.reset();
    });

    // alerta de bootstrap
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} mt-3`;
        alertDiv.textContent = message;
        document.body.appendChild(alertDiv);

        // fade alert
        setTimeout(function () {
            alertDiv.remove();
        }, 3000);
    }


     async function displayProducts() {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const products = await response.json();

           
            products.forEach(product => {
                
                console.log('Product:', product);
            });
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }
    displayProducts();
});
