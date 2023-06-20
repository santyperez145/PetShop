
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

  return `<div class="card" style="width: 25rem;">
            <img class="img-box" src="${product.imagen}" class="card-img-top" alt="${product.producto}">
            <div class="card-body">
              <h5 class="card-title">${product.producto}</h5>
              <h6 class="${quantityClass}">${quantityText}</h6>
              <div class="price-div">
                <h5>$${product.precio}</h5>
                <a href="details.html?id=${product._id}" class="btn btn-primary">More Details</a>
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
    const nameMatch = selectedProducts.length === 0 || selectedProducts.includes(product.producto.toLowerCase());
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

