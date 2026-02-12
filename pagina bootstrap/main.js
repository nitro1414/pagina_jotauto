// carrito.js

let carrito = [];

// Elementos del DOM
const contadorCarrito = document.querySelector('.badge');
const listaCarritoModal = document.getElementById('lista-carrito');

// Función para inicializar los eventos
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (e) => {
        // Buscamos si el clic fue en un botón de agregar
        if (e.target.classList.contains('btn-agregar') || e.target.closest('.btn-agregar')) {
            const boton = e.target.classList.contains('btn-agregar') ? e.target : e.target.closest('.btn-agregar');
            
            const producto = {
                nombre: boton.getAttribute('data-nombre'),
                precio: parseFloat(boton.getAttribute('data-precio'))
            };
            
            agregarAlCarrito(producto);
        }
    });
});

function agregarAlCarrito(producto) {
    carrito.push(producto);
    actualizarInterfaz();
}

function actualizarInterfaz() {
    // 1. Número en la burbuja azul
    const contador = document.getElementById('contador-carrito');
    if (contador) {
        contador.innerText = carrito.length;
        contador.style.display = carrito.length === 0 ? 'none' : 'block';
    }

    // 2. Lista de productos
    if (listaCarritoModal) {
        listaCarritoModal.innerHTML = ''; // Borramos el "carrito vacío" inicial

        carrito.forEach((item, index) => {
            listaCarritoModal.innerHTML += `
                <div class="d-flex align-items-center mb-3 border-bottom pb-2">
                    <div class="flex-grow-1">
                        <h6 class="mb-0 fw-bold">${item.nombre}</h6>
                        <small class="text-primary">$${item.precio.toFixed(2)}</small>
                    </div>
                    <button class="btn btn-danger btn-sm ms-2" onclick="window.eliminarDelCarrito(${index})">
                        <i class="bi bi-trash3-fill"></i>
                    </button>
                </div>
            `;
        });

        if (carrito.length === 0) {
            listaCarritoModal.innerHTML = '<p class="text-center text-muted py-4">Tu carrito está vacío</p>';
        }
    }

    // 3. Sumar el Total
    const totalFinal = carrito.reduce((sum, item) => sum + item.precio, 0);
    document.getElementById('total-carrito').innerText = `$${totalFinal.toFixed(2)}`;
}

// 4. Función global para eliminar
window.eliminarDelCarrito = function(index) {
    carrito.splice(index, 1);
    actualizarInterfaz();
};

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarInterfaz();
}
function enviarWhatsApp() {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    let telefono = "584248399780"; // ¡PON AQUÍ TU NÚMERO! (Con código de país, sin el +)
    let mensaje = "¡Hola Jotauto!  Me interesa comprar estos productos:\n\n";
    let total = 0;

    carrito.forEach((item, index) => {
        mensaje += ` ${item.nombre} - $${item.precio.toFixed(2)}\n`;
        total += item.precio;
    });

    mensaje += `\n *Total: $${total.toFixed(2)}*`;
    mensaje += "\n\n¿Me podrían dar los datos para el pago?";

    // Codificar el mensaje para que el navegador lo entienda
    const mensajeCodificado = encodeURIComponent(mensaje);
    
    // Crear el enlace y abrirlo
    const url = `https://wa.me/${telefono}?text=${mensajeCodificado}`;
    window.open(url, '_blank');
}