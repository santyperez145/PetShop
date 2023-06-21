import { renderCards, filterCards, pintarCheckbox, agregarCategoriaDos } from "../../module/functions.js";

fetch("https://mindhub-xj03.onrender.com/api/petshop")
  .then((response) => response.json())
  .then((data) => {
    let card = document.getElementById("box-cards");
    let productsFarmacia = data.filter((event) =>
      event.categoria.includes("farmacia")
    );
    renderCards(productsFarmacia, card)

    agregarCategoriaDos(productsFarmacia)

    // Obtener los productos únicos
    const products = Array.from(new Set(data
      .filter((product) => product.categoria.includes("farmacia"))
      .map((product) => product.categoria2)));

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
        filterCards(productsFarmacia, selectedProducts /* searchInput */, card);
      });
    });

    /*searchInput.addEventListener("keyup", () => {
      const searchQuery = searchInput.value.toLowerCase().trim();
      filterCards(productsFarmacia, selectedProducts, searchQuery, card);
    });*/


    //carro de compras

    let comprado = []
    
    const functionComprar = (event)=> {
      if (event.target.localName === "button"){
        let agregado = productsFarmacia.find(producto => producto._id == event.target.dataset._id)
         comprado.push(agregado)
         console.log(comprado)
      }
      localStorage.setItem("compradoFarmacia", JSON.stringify(comprado))
    }

    let compra = JSON.parse(localStorage.getItem("compradoFarmacia"))
    console.log(compra)

    card.addEventListener("click", functionComprar)
  })
  .catch((error) => console.error(error));