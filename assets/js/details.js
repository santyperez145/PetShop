import { renderDetails, addToCart, updateCartUI } from "../../module/functions.js";



let card = document.getElementById("details-div"); 

const params = new URLSearchParams(location.search)

const id = params.get('id')

fetch("https://mindhub-xj03.onrender.com/api/petshop")
  .then(response => response.json())
  .then(data => {
    const eventFinded = data.find(product => product._id == id);
      renderDetails(eventFinded, card);
      
      const addToCartButton = document.getElementById("add-to-cart-button");
      addToCartButton.addEventListener("click", () => {
        addToCart(eventFinded._id);
        updateCartUI();
      });
    })
  .catch(error => console.error(error));