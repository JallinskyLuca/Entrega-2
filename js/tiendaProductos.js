// Creamos El array de objetos "productos" con cada una de sus propiedades
const productos = [
    { id: 1, nombre: "Remera", precio: 200, imagen: "./img/remera-blanca.png", categoria: "Remeras" },
    { id: 2, nombre: "Pantalón", precio: 400, imagen: "./img/pantalones.png", categoria: "Pantalones" },
    { id: 3, nombre: "Short", precio: 150, imagen: "./img/shorts.png", categoria: "Pantalones" },
    { id: 4, nombre: "Zapatillas", precio: 350, imagen: "./img/zapatillas.png", categoria: "Calzado" },
    { id: 5, nombre: "Ojotas", precio: 150, imagen: "./img/ojota.png", categoria: "Calzado" },
    { id: 6, nombre: "Campera", precio: 800, imagen: "./img/campera.png", categoria: "Abrigos" }
];

// Declaro el array que almacena los productos en el carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Referencias de elementos mediante el uso de sus ID´s
const productosContainer = document.getElementById("productos-container");
const carritoContainer = document.getElementById("carrito-container");
const totalCarrito = document.getElementById("total-carrito");
const btnVaciarCarrito = document.getElementById("vaciar-carrito");
const btnFinalizarCompra = document.getElementById("finalizar-compra");
const modal = document.getElementById("modal-pago");
const btnCerrarModal = document.getElementById("cerrar-modal");
const formularioPago = document.getElementById("formularioPago");
const btnPagar = document.getElementById("pagar");

// Esta funcion se encarga de mostrar los productos del div y el boton de "Agregar"
function mostrarProductos() {
    productosContainer.innerHTML = "";
    productos.forEach(producto => {
        const productoHTML = document.createElement("div");
        productoHTML.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p>${producto.nombre} - $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar</button>
        `;
        productosContainer.appendChild(productoHTML);
    });
}

// Esta función agrega un producto al carrito, Busca si el producto ya está en el carrito, Si está, incrementa la cantidad. Si no, agrega el producto con cantidad 1
function agregarAlCarrito(id) {
    const productoEnCarrito = carrito.find(prod => prod.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        const producto = productos.find(prod => prod.id === id);
        carrito.push({ ...producto, cantidad: 1 });
    }
    actualizarCarrito();
}

// Esta función actualiza el carrito, calcula el total del carrito, actualiza el total en "totalCarrito" y lo guarda en el localStorage
function actualizarCarrito() {
    carritoContainer.innerHTML = "";
    let total = 0;

    carrito.forEach(producto => {
        total += producto.precio * producto.cantidad;
        const productoHTML = document.createElement("div");
        productoHTML.innerHTML = `
            <p>${producto.nombre} - $${producto.precio} x ${producto.cantidad}</p>
            <button onclick="eliminarDelCarrito(${producto.id})">-</button>
        `;
        carritoContainer.appendChild(productoHTML);
    });

    totalCarrito.textContent = `Total: $${total}`;
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Esta funcion elimina un producto o reduce su cantidad, si esta lo reduce y si la cantidad llega a 0 lo elimina
function eliminarDelCarrito(id) {
    const productoEnCarrito = carrito.find(prod => prod.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad--;
        if (productoEnCarrito.cantidad === 0) {
            carrito = carrito.filter(prod => prod.id !== id);
        }
    }
    actualizarCarrito();
}

// Agregamos todos los eventListeners a los botones de la tienda, cuando se hace click se ejecuta la funcion correspondiente
btnVaciarCarrito.addEventListener("click", () => {
    if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
        carrito = [];
        actualizarCarrito();
    }
});

btnFinalizarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos para finalizar la compra.");
        return;
    }

    modal.style.display = "block";
});

btnCerrarModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Evita que el formulario se envíe de forma predeterminada, nos va a pedir informacion obligatoriamente para poder enviarlo
formularioPago.addEventListener("submit", (event) => {
    event.preventDefault(); 
    const nombre = document.getElementById("nombre").value;
    const numeroTarjeta = document.getElementById("tarjeta").value;

    if (isNaN(numeroTarjeta)) {
        alert("Por favor, ingresa un número de tarjeta válido.");
        return;
    }

    alert("Pago procesado. ¡Gracias por tu compra!");
    modal.style.display = "none";
    carrito = [];
    actualizarCarrito();
});

// Llamamos a las funciones principales para ejecutar el progrma 
mostrarProductos();
actualizarCarrito
