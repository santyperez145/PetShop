import { renderCards, filterCards, pintarCheckbox } from "../../module/functions.js";

fetch("https://mindhub-xj03.onrender.com/api/petshop")
  .then((response) => response.json())
  .then((data) => {
    let card = document.getElementById("box-cards");
    let productsjugueteria = data.filter((event) =>
      event.categoria.includes("jugueteria")
    );
    renderCards(productsjugueteria, card)

    // Obtener los productos únicos
    const products = Array.from(new Set(data
      .filter((product) => product.categoria.includes("jugueteria"))
      .map((product) => product.producto)));

    // Carga de checkboxes y productos
    const checkboxesdiv = document.getElementById("search");
    pintarCheckbox(products, checkboxesdiv);

    // Declaraciones para los filtros
    const selectedProducts = [];
    //let searchInput = document.getElementById("search-input");
    const checkboxes = checkboxesdiv.querySelectorAll('input[type="checkbox"]');

    // Filtros
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        selectedProducts.length = 0; // Vaciar el arreglo antes de cada filtrado
        checkboxes.forEach((checkbox) => {
          if (checkbox.checked) {
            selectedProducts.push(checkbox.value.toLowerCase());
          }
        });
        /*const searchInput = document.getElementById("search-input").value.toLowerCase().trim();*/
        filterCards(productsjugueteria, selectedProducts /* searchInput */, card);
      });
    });

    /*searchInput.addEventListener("keyup", () => {
      const searchQuery = searchInput.value.toLowerCase().trim();
      filterCards(productsjugueteria, selectedProducts, searchQuery, card);
    });*/
  })
  .catch((error) => console.error(error));