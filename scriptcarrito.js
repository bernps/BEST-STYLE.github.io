// Función para agregar producto al carrito
function agregarAlCarrito(event) {
  // Obtener los datos del producto directamente desde el atributo data-producto
  const producto = JSON.parse(event.target.getAttribute('data-producto'));

  // Leer carrito desde localStorage
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Verificar si el producto ya está en el carrito
  const indice = carrito.findIndex(item => item.nombre === producto.nombre);
  
  if (indice !== -1) {
    // Si el producto ya existe, aumentar la cantidad
    carrito[indice].cantidad += 1;
  } else {
    // Si el producto no existe, agregarlo al carrito
    producto.cantidad = 1;
    carrito.push(producto);
  }

  // Guardar carrito en localStorage
  localStorage.setItem('carrito', JSON.stringify(carrito));

  // Opcional: Mostrar un mensaje o actualizar el carrito en la UI (puedes personalizar esto)
  alert(`${producto.nombre} agregado al carrito`);
}

// Función para actualizar la interfaz de usuario del carrito
function actualizarCarrito() {
  // Leer carrito desde localStorage
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Obtener contenedor de la lista de productos
  const listaProductos = document.querySelector('.lista-productos');
  
  // Limpiar lista de productos
  listaProductos.innerHTML = '';

  // Iterar sobre productos en carrito
  carrito.forEach((producto, indice) => {
    // Crear HTML para producto
    const productoHTML = `
      <div class="producto">
        <img src="${producto.imagen}" alt="Imagen producto">
        <div class="descripcion">
          <h2>${producto.nombre}</h2>
          <p>${producto.descripcion}</p>
        </div>
        <div class="precio-cantidad">
          <p>Precio unitario: $${producto.precio}</p>
          <input type="number" value="${producto.cantidad}" readonly>
          <button class="aumentar-cantidad" data-indice="${indice}">+</button>
          <button class="disminuir-cantidad" data-indice="${indice}">-</button>
        </div>
        <button class="eliminar-producto" data-indice="${indice}">Eliminar</button>
      </div>
    `;

    // Agregar producto a lista
    listaProductos.innerHTML += productoHTML;
  });

  // Actualizar resumen de la compra
  const totalProductos = carrito.length;
  const totalPrecio = carrito.reduce((acumulado, producto) => acumulado + (producto.precio * producto.cantidad), 0);
  document.querySelector('.resumen-compra').innerHTML = `
    <p>Total de productos: ${totalProductos}</p>
    <p>Total de precio: $${totalPrecio}</p>
  `;
}

// Agregar evento de clic a botones de agregar al carrito
document.querySelectorAll('.agregar').forEach((boton) => {
  boton.addEventListener('click', agregarAlCarrito);
});

// Verificar si estamos en la página carrito.html
if (document.querySelector('.lista-productos')) {
  actualizarCarrito();
}

// Agregar evento de clic a botones de eliminar producto
function eliminarProducto(indice) {
  // Leer carrito desde localStorage
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Eliminar producto del carrito
  carrito.splice(indice, 1);

  // Guardar carrito actualizado en localStorage
  localStorage.setItem('carrito', JSON.stringify(carrito));

  // Actualizar la vista del carrito
  actualizarCarrito();
}

document.querySelector('.lista-productos').addEventListener('click', (event) => {
  // Verificar si el evento es de un botón de eliminar
  if (event.target.classList.contains('eliminar-producto')) {
    const indice = event.target.dataset.indice;
    eliminarProducto(indice);
  }
});

// Agregar evento de clic a botones de aumentar y disminuir cantidad
document.querySelector('.lista-productos').addEventListener('click', (event) => {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Aumentar cantidad
  if (event.target.classList.contains('aumentar-cantidad')) {
    const indice = event.target.dataset.indice;
    carrito[indice].cantidad += 1;
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
  }

  // Disminuir cantidad
  if (event.target.classList.contains('disminuir-cantidad')) {
    const indice = event.target.dataset.indice;
    if (carrito[indice].cantidad > 1) {
      carrito[indice].cantidad -= 1;
      localStorage.setItem('carrito', JSON.stringify(carrito));
      actualizarCarrito();
    }
  }
});

// Función para vaciar el carrito
function vaciarCarrito() {
  // Eliminar el carrito de localStorage
  localStorage.removeItem('carrito');

  // Limpiar la lista de productos en la UI
  actualizarCarrito();
}

// Agregar evento de clic al botón de vaciar carrito
document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);

// Función para procesar la compra
function procesarCompra() {
  // Vaciar el carrito
  vaciarCarrito();

  // Mostrar el mensaje de compra exitosa
  const mensajeCompraExitosa = document.getElementById('mensaje-compra-exitosa');
  mensajeCompraExitosa.style.display = 'block';

  // Ocultar el mensaje de compra exitosa después de 3 segundos
  setTimeout(() => {
    mensajeCompraExitosa.style.display = 'none';
  }, 3000);  // 3000ms = 3 segundos
}

// Agregar evento de clic al botón de comprar
document.getElementById('comprar').addEventListener('click', procesarCompra);
