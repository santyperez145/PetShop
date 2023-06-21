import { agregarCategoriaDos } from "../../module/functions.js";

fetch("https://mindhub-xj03.onrender.com/api/petshop")
  .then((response) => response.json())
  .then((data) => {
    let products = data;
    agregarCategoriaDos(products);

    const removeFromCart = (event) => {
      if (event.target.classList.contains("remove-from-cart")) {
        const productId = event.target.dataset._id;
        let comprado = JSON.parse(localStorage.getItem("comprado")) || [];
        const productIndex = comprado.findIndex((producto) => producto._id === productId);
        if (productIndex !== -1) {
          const product = comprado[productIndex];
          const productInAPI = products.find((producto) => producto._id === productId);
          if (productInAPI) {
            productInAPI.disponibles += 1;
          }
          product.cantidad -= 1;
          if (product.cantidad === 0) {
            comprado.splice(productIndex, 1);
          }
          localStorage.setItem("comprado", JSON.stringify(comprado));
          renderCartItems(comprado);
        }
      }
    };

    const increaseQuantity = (event) => {
      if (event.target.classList.contains("increase-quantity")) {
        const productId = event.target.dataset._id;
        let comprado = JSON.parse(localStorage.getItem("comprado")) || [];
        const product = comprado.find((producto) => producto._id === productId);
        const productInAPI = products.find((producto) => producto._id === productId);
        if (product && productInAPI) {
          if (productInAPI.disponibles > 0) {
            productInAPI.disponibles -= 1;
            product.cantidad += 1;
            localStorage.setItem("comprado", JSON.stringify(comprado));
            renderCartItems(comprado);
          } else {
            alert("No hay más stock disponible para este producto.");
          }
        }
      }
    };

    const renderCartItems = (comprado) => {
      const shoppingCart = document.getElementById("shopping-cart");
      shoppingCart.innerHTML = `
        <h3>Productos en el Carrito:</h3>
      `;
      let total = 0;
      for (const producto of comprado) {
        const productInAPI = products.find((item) => item._id === producto._id);
        if (productInAPI) {
          const existingCartProduct = document.querySelector(`[data-_id="${producto._id}"]`);
          if (existingCartProduct) {
            const quantityElement = existingCartProduct.querySelector(".quantity");
            if (quantityElement) {
              quantityElement.textContent = producto.cantidad;
            }
          } else {
            const cartProduct = document.createElement("div");
            cartProduct.innerHTML = `
              <p>${producto.producto} - Precio: $${producto.precio} - Disponibles: ${productInAPI.disponibles} - Cantidad agregada: <span class="quantity">${producto.cantidad}</span></p>
              <button class="btn btn primary remove-from-cart" data-_id="${producto._id}">Eliminar</button>
              <button class="btn btn primary increase-quantity" data-_id="${producto._id}">Añadir cantidad</button>
            `;
            shoppingCart.appendChild(cartProduct);
          }
          total += producto.precio * producto.cantidad;
        }
      }
      shoppingCart.innerHTML += `<p>Total: $${isNaN(total) ? "0.00" : total.toFixed(2)}</p>`;
    
      const realizarCompraButton = document.createElement("button");
      realizarCompraButton.textContent = "Confirmar Pago";
      shoppingCart.appendChild(realizarCompraButton);
    
      const customerForm = document.createElement("form");
      customerForm.innerHTML = `
        <h3>Información del Cliente:</h3>
        <input type="text" name="nombre" placeholder="Nombre" required>
        <input type="text" name="apellido" placeholder="Apellido" required>
        <input type="text" name="direccion" placeholder="Dirección" required>
        <input type="text" name="formaPago" placeholder="Forma de Pago" required>
      `;
      shoppingCart.insertBefore(customerForm, realizarCompraButton);
    };

    document.getElementById("shopping-cart").addEventListener("click", removeFromCart);
    document.getElementById("shopping-cart").addEventListener("click", increaseQuantity);

    renderCartItems(JSON.parse(localStorage.getItem("comprado")) || []);
  })
  .catch((error) => console.error(error));
