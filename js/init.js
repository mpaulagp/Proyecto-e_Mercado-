const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

const navUsername = document.getElementById("username")
const username = localStorage.getItem("text")

// Si está logueado que muestre el nav normal, sino que diga iniciar sesión
if (username) {
  navUsername.innerHTML = `
          <a class="nav-link dropdown-toggle" href="my-profile.html" role="button" data-bs-toggle="dropdown" aria-expanded="false">${username}</a>
          <ul class="dropdown-menu" aria-labelledby="navbarDarkDropdownMenuLink">
            <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
            <li><a class="dropdown-item" href="my-profile.html" id="miPerfil">Mi perfil</a></li>
            <li><a onclick="cerrarSesion()" class="dropdown-item" href="index.html">Cerrar sesión</a></li>
          </ul>
        `;
} else {
  navUsername.innerHTML = `
  <a class="nav-link" href="index.html">Iniciar Sesión</a>
  `
}
function cerrarSesion() {
  localStorage.removeItem("text");
  localStorage.removeItem("PrimNom");
  localStorage.removeItem("SegNom");
  localStorage.removeItem("PrimApell");
  localStorage.removeItem("SegApell");
  localStorage.removeItem("Tel");
}