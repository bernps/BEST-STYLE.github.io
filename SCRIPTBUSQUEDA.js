// Seleccionamos los elementos necesarios
const buscarInput = document.getElementById('buscar');  // Campo de búsqueda
const btnBuscar = document.getElementById('btn-buscar');  // Botón de búsqueda
const productos = document.querySelectorAll('.contenedor > div');  // Todos los productos en el contenedor
let timeoutId;  // Variable para manejar el temporizador de la búsqueda

// Función para buscar productos
function buscarProductos() {
  const textoBuscar = buscarInput.value.toLowerCase();  // Obtener el texto de búsqueda en minúsculas
  
  productos.forEach((producto) => {
    const nombreProducto = producto.querySelector('.información p').textContent.toLowerCase();  // Obtener el nombre del producto del primer <p> dentro de .información

    // Verificar si el nombre del producto contiene el texto de búsqueda
    if (nombreProducto.includes(textoBuscar)) {
      producto.style.display = 'block';  // Mostrar el producto si coincide
    } else {
      producto.style.display = 'none';  // Ocultar el producto si no coincide
    }
  });
}

// Evento para hacer la búsqueda mientras el usuario escribe (con un pequeño retraso de 500 ms)
buscarInput.addEventListener('input', () => {
  clearTimeout(timeoutId);  // Limpiar el temporizador anterior
  timeoutId = setTimeout(buscarProductos, 500);  // Esperar 500 ms para realizar la búsqueda
});

// Evento para realizar la búsqueda cuando el usuario haga clic en el botón "Buscar"
btnBuscar.addEventListener('click', buscarProductos);
