document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    document.getElementById('confirmarPedido').addEventListener('click', () => confirmarPedido());
    const carrito = [];
    const carritoContainer = document.getElementById('carrito-container');
    let totalCompra = 0;
    let confirmar_pedido="";
    function cargarProductos() {
      const productosContainer = document.querySelector('.productos');
  
      fetch('http://localhost:3000/productos')  
        .then(response => response.json())
        .then(data => {
          console.log('Datos obtenidos:', data);
  
          data.forEach(producto => {
            const card = crearTarjetaProducto(producto);
            productosContainer.appendChild(card);
          });
        })
        .catch(error => console.error('Error al obtener datos:', error));
    }
  
    function crearTarjetaProducto(producto) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.descripcion}" class="imagen-producto">
      <p class="descripcion">${producto.descripcion}</p>
      <p class="precio">Precio: $${producto.precio}</p>
      <button class="agregar-al-carrito" data-id="${producto.id}" data-precio="${producto.precio}">
        Agregar al carrito
      </button>
      `;
  
      const botonAgregar = card.querySelector('.agregar-al-carrito');
      botonAgregar.addEventListener('click', () => agregarAlCarrito(producto));
  
      return card;
    }
  
    function agregarAlCarrito(producto) {
      const productoEnCarrito = carrito.find(item => item.id === producto.id_producto);
        console.log(productoEnCarrito)
      if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
        productoEnCarrito.total = productoEnCarrito.cantidad * productoEnCarrito.precio;
      } else {

        carrito.push({
          id: producto.id_producto,
          descripcion: producto.descripcion,
          precio: producto.precio,
          cantidad: 1,
          total: producto.precio,
        });
      }
      console.log(carrito)

  
      mostrarCarrito();
    }
    function confirmarPedido(){
        fetch('http://localhost:3000/agg-pedido', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ confirmar_pedido, totalCompra }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Pedido guardado exitosamente:', data);
            limpiarCarrito();
        })
        .catch(error => console.error('Error al guardar pedido:', error));
    }
    function mostrarCarrito() {
        carritoContainer.innerHTML = 'Resumen Compra';
        totalCompra = 0; 
        carrito.forEach(item => {
          const carritoItem = document.createElement('div');
          carritoItem.classList.add('carrito-item');
          carritoItem.innerHTML += `
            <p>${item.descripcion} - Cantidad: ${item.cantidad} - Precio: $${(item.precio * item.cantidad).toFixed(2)}</p>
          `;
          carritoContainer.appendChild(carritoItem);
    
          totalCompra += item.precio * item.cantidad; 
        });
    
        // Mostrar el total de la compra fuera del bucle forEach
        totalCompraContainer.textContent = `Total de la compra: $${totalCompra.toFixed(2)}`;
        confirmar_pedido = carritoContainer.innerText.replace(/\n/g, ' ');
        console.log(confirmar_pedido)
        
      }
      function limpiarCarrito() {
        carritoContainer.innerHTML = '';
        carrito.length = 0;
        totalCompra = 0;
        confirmar_pedido = "";
        totalCompraContainer.innerHTML="Total de la compra: $0.0"
    }
    });
    
  