
export function crearCheck(categoria) {
  const div = document.createElement("DIV");

  const input = document.createElement("INPUT");
  input.type = "checkbox";
  input.className = "form-check-input";
  input.value = categoria;
  input.id = `${categoria}-check`;
  input.name = "category";

  const label = document.createElement("LABEL");
  label.className = "form-check-label";
  label.setAttribute("for", `${categoria}-check`);
  label.textContent = categoria;

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

export function renderCards(products, card) {
  card.innerHTML = "";
  let template = "";
  for (let product of products) {
    template += createCards(product);
  }
  card.innerHTML = template;
}

export function createCards(product) {
  return `<div class="card" style="width: 16rem;">
            <img class="img-box" src="${product.imagen}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <h6>Date: ${product.date}</h6>
              <div class="price-div">
                <h5>$${product.price}</h5>
                <a href="details.html?id=${product._id}" class="btn btn-primary">More Details</a>
              </div>
            </div>
          </div>`;
}

export function filterCards(products, selectedProducts, searchQuery, card) {
  const filteredProducts = products.filter((product) => {
    const nameMatch = selectedProducts.length === 0 || selectedProducts.includes(product.name.toLowerCase());
    const descriptionMatch = product.description.toLowerCase().includes(searchQuery);
    return nameMatch && (nameMatch || descriptionMatch);
  });

  renderCards(filteredProducts, card);

  const noResultsMessage = document.getElementById("no-results-message");
  if (filteredProducts.length === 0) {
    noResultsMessage.style.display = "block";
  } else {
    noResultsMessage.style.display = "none";
  }
}

