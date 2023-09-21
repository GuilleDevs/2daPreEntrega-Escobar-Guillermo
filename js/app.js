// Clase "molde" para los items de frutas
class Item {
  constructor(nombre, precio, imagen) {
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
  }
}

// Items de frutas
const frutilla = new Item("Frutilla", 150, "frutilla.png");
const banana = new Item("Banana", 100, "banana.png");
const naranja = new Item("Naranja", 90, "naranja.png");
const manzana = new Item("Manzana", 80, "manzana.png");

// Array para el inventario.
const inventario = [];

// Presupuesto disponible
let presupuesto = 1000;

// Elementos del DOM
const elPresupuesto = document.querySelector("#presupuesto span");
elPresupuesto.innerText = presupuesto; // Para que muestre el presupuesto disponible apenas carga la aplicación}
const elInventario = document.getElementById("inventario");

// Función para agregar items a nuestro inventario
function comprar(itemDeFrutas) {
  // Verificamos si tenemos el presupuesto disponible para la compra
  if (presupuesto - itemDeFrutas.precio >= 0) {
    inventario.push(itemDeFrutas);
    presupuesto -= itemDeFrutas.precio; // Actualizamos el presupuesto
    actualizarHTML();
  } else {
    alert(`No tenés presupuesto suficiente para comprar ${itemDeFrutas.nombre}.`);
  }
}

// Función para vender un item
function vender(nombreDelItem) {
  // Buscamos el item con find
  const itemEncontrado = inventario.find((item) => item.nombre == nombreDelItem);

  // Si está en el inventario, lo quitamos y actualizamos el HTML
  if (itemEncontrado) {
    // Actualizamos el presupuesto
    presupuesto += itemEncontrado.precio;
    // Lo quitamos del inventario
    const indice = inventario.indexOf(itemEncontrado);
    inventario.splice(indice, 1);
    // Actualizamos el HTML
    actualizarHTML();
  }
}

// Función para actualizar el HTML de la aplicación (presupuesto e items)
function actualizarHTML() {
  elInventario.innerHTML = "";
  for (const itemDelFrutas of inventario) {
    const li = `
    <li onclick="vender('${itemDelFrutas.nombre}')">
      <img src="img/${itemDelFrutas.imagen}" alt="${itemDelFrutas.imagen}" />
    </li>
    `;
    // Va a ir concatenando los li creados en el elemento #inventario (ul)
    elInventario.innerHTML += li;
  }

  elPresupuesto.innerText = presupuesto;
}
