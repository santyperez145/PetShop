import { renderCards, filterCards, pintarCheckbox } from "../../module/functions.js";

fetch("https://mindhub-xj03.onrender.com/api/petshop")
  .then((response) => response.json())
  .then((data) => {
    let card = document.getElementById("box-cards");
    let productsFarmacia = data.filter((event) =>
      event.categoria.includes("farmacia")
    );
    renderCards(productsFarmacia, card)

    // Obtener los productos únicos
    const products = Array.from(new Set(data.map((product) => product.name)));

    // Carga de checkboxes y productos
    const checkboxesdiv = document.getElementById("search");
    pintarCheckbox(products, checkboxesdiv);

    // Declaraciones para los filtros
    const selectedProducts = [];
    let searchInput = document.getElementById("search-input");
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
        const searchQuery = searchInput.value.toLowerCase().trim();
        filterCards(productsFarmacia, selectedProducts, searchQuery, card);
      });
    });

    searchInput.addEventListener("keyup", () => {
      const searchQuery = searchInput.value.toLowerCase().trim();
      filterCards(productsFarmacia, selectedProducts, searchQuery, card);
    });
  })
  .catch((error) => console.error(error));