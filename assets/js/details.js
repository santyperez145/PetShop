import { renderDetails } from "../../module/functions.js";

let comprado = JSON.parse(localStorage.getItem("comprado")) || [];

console.log(comprado)

let card = document.getElementById("details-div"); 

const params = new URLSearchParams(location.search)

const id = params.get('id')

fetch("https://mindhub-xj03.onrender.com/api/petshop")
  .then(response => response.json())
  .then(data => {
    const productFinded = data.find(product => product._id == id);
      renderDetails(productFinded, card);

      let functionComprar = (event)=> {
        if (event.target.localName === "button"){
          let agregado = productFinded
           comprado.push(agregado)
           console.log(comprado)
        }
        localStorage.setItem("comprado", JSON.stringify(comprado))
      }
      
      card.addEventListener("click", functionComprar)
    })
  .catch(error => console.error(error));