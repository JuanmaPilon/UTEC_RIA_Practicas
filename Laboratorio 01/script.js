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
});
