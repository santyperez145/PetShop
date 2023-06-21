
export function crearCheck(producto) {
  const div = document.createElement("DIV");

  const input = document.createElement("INPUT");
  input.type = "checkbox";
  input.className = "form-check-input";
  input.value = producto;
  input.id = `${producto}-check`;
  input.name = "producto";

  const label = document.createElement("LABEL");
  label.className = "form-check-label";
  label.setAttribute("for", `${producto}-check`);
  label.textContent = producto;

  div.appendChild(input);
  div.appendChild(label);

  return div;
}

export function pintarCheckbox(categories, elemento) {
  const fragment = document.createDocumentFragment();

  for (const category of categories) {
    const div = crearCheck(category);
    fragment.appendChild(div);
  }

  elemento.appendChild(fragment);
}

export function createCards(product) {
  let quantityText = "";
  let quantityClass = "";

  if (product.disponibles === 0) {
    quantityText = "No hay stock";
    quantityClass = "out-of-stock";
  } else if (product.disponibles <= 5) {
    quantityText = "¡Ultimas Unidades!";
    quantityClass = "last-units";
  } else {
    quantityText = `Disponibles: ${product.disponibles}`;
  }

  return `<div class="card" style="width: 22rem;">
            <img class="img-box" src="${product.imagen}" class="card-img-top" alt="${product.producto}">
            <div class="card-body">
              <h5 class="card-title">${product.producto}</h5>
              <h6 class="${quantityClass}">${quantityText}</h6>
              <div class="price-div">
                <h5>$${product.precio}</h5>
                <a href="details.html?id=${product._id}" class="btn btn-primary">Mas Detalles</a>
                <button class="btn btn primary" data-_id="${product._id}" >Comprar</button>
              </div>
            </div>
          </div>`;
}

export function renderCards(products, card) {
  let template = "";
  for (let product of products) {
    template += createCards(product);
  }
  card.innerHTML = template;
}

export function filterCards(products, selectedProducts /*searchQuery*/, card) {
  const filteredProducts = products.filter((product) => {
    const nameMatch = selectedProducts.length === 0 || selectedProducts.includes(product.categoria2.toLowerCase());
    return nameMatch;
  });

  renderCards(filteredProducts, card);

  const noResultsMessage = document.getElementById("no-results-message");
  if (filteredProducts.length === 0) {
    noResultsMessage.style.display = "block";
  } else {
    noResultsMessage.style.display = "none";
  }
}

export function agregarCategoriaDos (array){
  let productos = []
  for( let producto of array ){
    if (producto.producto.toLowerCase().includes("perro") || producto.descripcion.toLowerCase().includes("perro")){
      producto.categoria2 = "Productos para perros"
      console.log(producto)
      productos.push(producto)
    }else if ((producto.producto.toLowerCase().includes("gato") || producto.descripcion.toLowerCase().includes("gato"))){
      producto.categoria2 = "Productos para gatos"
      console.log(producto)
      productos.push(producto)
    }else{
      producto.categoria2 = "Productos para Perros y Gatos"
      console.log(producto)
      productos.push(producto)
    }
  }
  return productos
}


//details

// Funcion para renderizar los detalles

export function renderDetails(object, card){
  let quantityText = "";
  let quantityClass = "";

  if (object.disponibles === 0) {
    quantityText = "No hay stock";
    quantityClass = "out-of-stock";
  } else if (object.disponibles <= 5) {
    quantityText = "¡Ultimas Unidades!";
    quantityClass = "last-units";
  } else {
    quantityText = `Disponibles: ${object.disponibles}`;
  }
  
  card.innerHTML = `
    <div class="details-card" style="width: 30rem;">
      <img src="${object.imagen}" class="card-img-top" alt="${object.producto}">
      <div class="details-body">
        <h5 class="details-title">${object.producto}</h5>
        <h6>Categoria: ${object.categoria}</h6>
        <h6 class="${quantityClass}">Cantidad: ${quantityText}</h6>
        <div class="details-pricediv">
          <h5 class="details-price">Precio: $${object.precio}</h5>
          <button class="btn btn primary" data-_id="${object._id}" >Comprar</button>
        </div>
      </div>
    </div>
    <h2 class="h2-description"> Descripcion</h2>
    <p class="details-text">${object.descripcion}</p>
  `;
}



