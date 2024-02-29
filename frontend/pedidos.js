document.addEventListener('DOMContentLoaded', () => {
    cargarPedidos();
});

function cargarPedidos() {
    const tablaPedidos = document.getElementById('tablaPedidos').getElementsByTagName('tbody')[0];

    fetch('http://localhost:3000/pedidos')
        .then(response => response.json())
        .then(data => {
            console.log('Pedidos obtenidos:', data);

            data.forEach(pedido => {
                const row = tablaPedidos.insertRow();
                row.insertCell(0).textContent = pedido.id_pedido;
                row.insertCell(1).textContent = pedido.contenido;
                row.insertCell(2).textContent = pedido.estado;
                row.insertCell(3).textContent = pedido.total_compra;
            });
        })
        .catch(error => console.error('Error al obtener pedidos:', error));
}

function verUltimoPedido() {
    fetch('http://localhost:3000/ultimo-pedido')
        .then(response => response.json())
        .then(data => {
            console.log('Último pedido obtenido:', data);
            mostrarFactura(data);
        })
        .catch(error => console.error('Error al obtener el último pedido:', error));
}

function mostrarFactura(pedido) {
    const facturaHTML = `
        <h2>Factura del Último Pedido</h2>
        <p>ID del Pedido: ${pedido.id_pedido}</p>
        <p>Contenido: ${pedido.contenido}</p>
        <p>Estado: ${pedido.estado}</p>
        <p>Total de la Compra: $${pedido.total_compra}</p>
        <!-- Puedes agregar más detalles si lo necesitas -->
    `;
    const facturaContainer = document.getElementById('factura-container');
    facturaContainer.innerHTML = facturaHTML;
}

function confirmarPedido() {
    const tipoEntrega = document.getElementById('entrega').value;

    fetch('http://localhost:3000/agg-pedido', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ confirmar_pedido, totalCompra, tipoEntrega }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Pedido guardado exitosamente:', data);
        window.location.href = "factura.html";
    })
    .catch(error => console.error('Error al guardar pedido:', error));
}

function mostrarDetallesPedido(data) {
    const detallePedidoContainer = document.getElementById('detallePedido');

}



function mostrarFactura(pedido) {
    const facturaHTML = `
        <h2>Factura del Último Pedido</h2>
        <p>ID del Pedido: ${pedido.id_pedido}</p>
        <p>Contenido: ${pedido.contenido}</p>
        <p>Estado: ${pedido.estado}</p>
        <p>Total de la Compra: $${pedido.total_compra}</p>
        <!-- Puedes agregar más detalles si lo necesitas -->
    `;
    const facturaContainer = document.getElementById('factura-container');
    facturaContainer.innerHTML = facturaHTML;
}
function cargarUltimoPedido(event) {
    event.preventDefault();

    fetch('http://localhost:3000/ultimo-pedido')
        .then(response => response.json())
        .then(data => {
            console.log('Último pedido obtenido:', data);
            sessionStorage.setItem('ultimoPedido', JSON.stringify(data)); 
        })
        .catch(error => console.error('Error al obtener el último pedido:', error));
}


