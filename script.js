// inicarsesion

document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault();

  // Obtener los valores de los campos de inicio de sesión
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  // Obtener la lista de registros existentes de localStorage
  var registros = JSON.parse(localStorage.getItem("registros")) || [];

  // Buscar el registro con el email y contraseña proporcionados
  var usuario = registros.find(function(registro) {
    return registro.email === email && registro.password === password;
  });

  if (usuario) {
    // Guardar el usuario conectado en localStorage
    localStorage.setItem("usuarioConectado", JSON.stringify(usuario));

    // Redirigir a la página de inicio
    window.location.href = "abrir.html";
  } else {
    // Mostrar un mensaje de error
    document.getElementById("login-message").innerHTML = "Email o contraseña incorrectos";
  }
});

// registro

function guardar() {
  // Obtener los valores de los campos de registro
  var nombre = document.getElementById("nombre").value;
  var telefono = document.getElementById("telefono").value;
  var emailRegistro = document.getElementById("emailRegistro").value;
  var passwordRegistro = document.getElementById("passwordRegistro").value;
  var confirmPassword = document.getElementById("confirmPassword").value;


  // Validar que las contraseñas coincidan
  if (passwordRegistro !== confirmPassword) {
    alert("Las contraseñas no coinciden");
    return;
  }

  // Crear un objeto con los datos del registro
  var registro = {
    nombre: nombre,
    telefono: telefono,
    email: emailRegistro,
    password: passwordRegistro
  };

  // Obtener la lista de registros existentes de localStorage
  var registros = JSON.parse(localStorage.getItem("registros")) || [];

  // Agregar el nuevo registro a la lista
  registros.push(registro);

  // Guardar la lista de registros en localStorage
  localStorage.setItem("registros", JSON.stringify(registros));

  // Redirigir a la página de inicio de sesión
  window.location.href = "sesion.html";
}


// usuarioConectado
document.addEventListener("DOMContentLoaded", function() {
// Reemplazar el texto "usuario conectado" en el menú de navegación
var usuarioConectado = JSON.parse(localStorage.getItem("usuarioConectado"));
if (usuarioConectado) {
document.getElementById("usuarioConectado").textContent = usuarioConectado.email;
}
});



// provincias

function updatePrices() {
// Get selected province value
var selectedProvince = document.getElementById("provincia").value;

// Set default values for envío and total
var envioPrice = 0;
var total = 0;

// Assign prices based on the selected province
switch (selectedProvince) {
case "CABA":
envioPrice = 1000;
break;
case "GBA":
envioPrice = 2500;
break;
case "ROSARIO":
envioPrice = 3000;
break;
// Add more cases for other provinces if needed

// Default case for "SELECCIONAR" or other values
default:
envioPrice = 0;
}

// Update "envio" span
document.getElementById("envio").textContent = "$" + envioPrice;

// Calculate total by summing the subtotal and envioPrice
var subtotalElements = document.querySelectorAll("#pedidoTable td:nth-child(6)");
var subtotal = 0;

subtotalElements.forEach(function (element) {
subtotal += parseFloat(element.textContent.replace("$", ""));
});

total = subtotal + envioPrice;

// Update "total" span
document.getElementById("total").textContent = "$" + total.toFixed(2);
}

// sheetDB

var form = document.getElementById('sheetdb-form'); 
  form.addEventListener("submit", e=> {
  e.preventDefault(); 
  fetch(form.action,{ 
  method: "POST", 
  body: new FormData(document.getElementById("sheetdb-form")), 
}).then( 
  response => response.json() 
  ).then((html) => { 
  // you can put any 35 code here 
  window.open('d.html', '_blank'); 
  }); 
  }); 

