document.addEventListener('DOMContentLoaded', () => {
    verUltimoPedido(); 
});

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
