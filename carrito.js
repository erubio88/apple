// carrito.js

function agregarAlCarrito(codigo, titulo, precio, inputId) {
  const cantidadInput = document.getElementById(inputId);
  const cantidad = cantidadInput.value;

  if (cantidad <= 0) {
    alert("Ingrese una cantidad válida.");
    return;
  }

  const precioNumerico = parseFloat(precio.replace(/[$,.]/g, ''));
  const subtotal = precioNumerico * parseInt(cantidad);

  const producto = {
    codigo: codigo,
    titulo: titulo,
    precio: formatCurrency(precioNumerico), // Update to formatted price
    talles: 'Talle', // You need to determine the size value
    cantidad: cantidad,
    subtotal: formatCurrency(subtotal),
  };

  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems.push(producto);
  localStorage.setItem('cart', JSON.stringify(cartItems));

  actualizarCarrito();
}

function actualizarCarrito() {
  const carritoTable = document.getElementById('carritoTable');
  let total = 0;

  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  carritoTable.innerHTML = '';

  cartItems.forEach((item, index) => {
    const cantidad = parseInt(item.cantidad);
    const precioNumeric = parseFloat(item.precio.replace(/[$,.]/g, ''));
    const subtotal = cantidad * precioNumeric;
    total += subtotal;

    const row = carritoTable.insertRow();

    row.innerHTML = `<td>${item.codigo}</td>
                     <td>${item.titulo}</td>
                     <td>${item.precio}</td>
                     <td>${item.talles}</td>
                     <td><input type="number" style="width: 40px; height: 40px;" value="${item.cantidad}" onchange="actualizarCantidad(${index}, this.value)"></td>    <td>${formatCurrency(subtotal)}</td>
                     <td><button onclick="eliminarFila(${index})"><img src="eliminar.png" alt="Eliminar" style="width: 10px; height: 10px;"></button></td>`;
  });

  const totalElement = document.getElementById('total');
  totalElement.textContent = `Total: ${formatCurrency(total)}`;
}


function actualizarCantidad(index, nuevaCantidad) {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cartItems[index];

  if (nuevaCantidad <= 0) {
    alert("Ingrese una cantidad válida.");
    return;
  }

  item.cantidad = nuevaCantidad;
  const nuevoSubtotal = parseFloat(item.precio.replace(/[$,.]/g, '')) * parseInt(nuevaCantidad);
  item.subtotal = formatCurrency(nuevoSubtotal);

  localStorage.setItem('cart', JSON.stringify(cartItems));
  actualizarCarrito();
}

function eliminarFila(index) {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  actualizarCarrito();
}

function cargarCarrito() {
  actualizarCarrito();
}


function formatCurrency(amount) {
  const formattedAmount = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(amount);
  return formattedAmount.replace(/\.00$/, ''); // Elimina los dos ceros después de la coma decimal si existen
}

window.addEventListener('load', cargarCarrito);






document.getElementById('buscarInput').addEventListener('input', function() {
  let filtro = this.value.toUpperCase();
  let catalogoItems = document.querySelectorAll('.catalogo-item');

  catalogoItems.forEach(function(item) {
    let titulo = item.querySelector('#titulo').textContent.toUpperCase();
    if (titulo.indexOf(filtro) > -1) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
});








