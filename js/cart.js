const CART_INFO_API = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

articlesInCart = []
updateSubtotal = 0;
envioPercentage = 0.15;

let DOLLAR_SYMBOL = "USD ";

//Función para actualizar los costos del carrito
function updateCartCosts() {
    let subtotalCartHTML = document.getElementById("subtotalCart");
    let envioHTML = document.getElementById("envioText");
    let totalCostHTML = document.getElementById("totalCostText");

    let subtotalToShow = DOLLAR_SYMBOL + updateSubtotal;
    let costEnvioToShow = DOLLAR_SYMBOL + Math.round(updateSubtotal * envioPercentage);
    let totalCost = DOLLAR_SYMBOL + (Math.round((updateSubtotal * envioPercentage) + updateSubtotal));

    subtotalCartHTML.innerHTML = subtotalToShow;
    envioHTML.innerHTML = costEnvioToShow;
    totalCostHTML.innerHTML = totalCost;
}

fetch(CART_INFO_API)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {

        articlesInCart = data;

        for (let i = 0; i < articlesInCart.articles.length; i++) {

            let article = articlesInCart.articles[i];

            let htmlContentToAppend = "";

            htmlContentToAppend += `
            <tr>
                <td><img src="${article.image}" style="width: 50px"></td>
                <td>${article.name}</td>
                <td>${article.currency} ${article.unitCost}</td>
                <td><input type="number" class="form-control w-25" id="cantArticle" value="${article.count}"></td>
                <td><p id="subt" class="fw-bold">${article.currency} ${article.count * article.unitCost}</p></td>
            </tr>
        `

            document.getElementById("cartTable").innerHTML = htmlContentToAppend;

            function subtotal(cantidad) {

                document.getElementById("subt").innerHTML = `${article.currency} ${cantidad * article.unitCost}`
                updateSubtotal = cantidad * article.unitCost;
                updateCartCosts()
            }

            document.getElementById("cantArticle").addEventListener("change", function () {
                cantidad = this.value;
                subtotal(cantidad);

            });

            document.getElementById("envioPremium").addEventListener("change", function () {
                envioPercentage = 0.15;
                updateCartCosts();
            });

            document.getElementById("envioExpress").addEventListener("change", function () {
                envioPercentage = 0.07;
                updateCartCosts();
            });

            document.getElementById("envioStandard").addEventListener("change", function () {
                envioPercentage = 0.05;
                updateCartCosts();
            });


        }

    })

// Activa o desactiva los campos dependiendo de lo elegido en Forma de Pago
document.getElementById("tarjCredito").onclick = function () {

    if (document.getElementById("tarjCredito").checked) {
        document.getElementById("numTarjeta").disabled = false;
        document.getElementById("codSeg").disabled = false;
        document.getElementById("vencTarj").disabled = false;
        document.getElementById("numCuenta").disabled = true;
        document.getElementById("formaPagoSel").innerHTML = `Tarjeta de Crédito`;

    } else {

        document.getElementById("numTarjeta").disabled = true;
        document.getElementById("codSeg").disabled = true;
        document.getElementById("vencTarj").disabled = true;
        document.getElementById("numCuenta").disabled = false;

    }

}

document.getElementById("transfer").onclick = function () {

    if (document.getElementById("transfer").checked) {
        document.getElementById("numTarjeta").disabled = true;
        document.getElementById("codSeg").disabled = true;
        document.getElementById("vencTarj").disabled = true;
        document.getElementById("numCuenta").disabled = false;
        document.getElementById("formaPagoSel").innerHTML = `Transferencia Bancaria`;

    } else {

        document.getElementById("numTarjeta").disabled = false;
        document.getElementById("codSeg").disabled = false;
        document.getElementById("vencTarj").disabled = false;
        document.getElementById("numCuenta").disabled = true;

    }

}

// Validaciones

window.addEventListener("load", () => {
    const formCart = document.getElementById("cartForm")
    const cantArt = document.getElementById("cantArticle")
    const envioP = document.getElementById("envioPremium")
    const envioE = document.getElementById("envioExpress")
    const envioS = document.getElementById("envioStandard")
    const calle = document.getElementById("calleEnvio")
    const numero = document.getElementById("numeroEnvio")
    const esquina = document.getElementById("esquinaEnvio")
    const tarjCred = document.getElementById("tarjCredito")
    const numTarj = document.getElementById("numTarjeta")
    const codeS = document.getElementById("codSeg")
    const venTarj = document.getElementById("vencTarj")
    const trans = document.getElementById("transfer")
    const cuenta = document.getElementById("numCuenta")

    formCart.addEventListener("submit", (e) => {
        e.preventDefault
        validaCampos()
        formCart.addEventListener("input", (e) => {
            e.preventDefault
            validaCampos()
        })
    })

    // Campo válido o no válido
    const validaCampos = () => {

        const validafalla = (input, msj) => {
            const formCart = input.parentElement
            const alerts = formCart.querySelector('#error')
            alerts.innerHTML = msj
            formCart.className = 'formuser falla'

        }

        const validok = (input, msj) => {
            const formCart = input.parentElement
            formCart.className = 'formuser ok'
        }

        // Validación campos calle, número y esquina
        if (calle.value.length < 1) {
            validafalla(calle, 'Ingresa una calle')
        } else {
            validok(calle)
        }

        if (numero.value.length < 1) {
            validafalla(numero, 'Ingresa un número')
        } else {
            validok(numero)
        }

        if (esquina.value.length < 1) {
            validafalla(esquina, 'Ingresa una esquina')
        } else {
            validok(esquina)
        }

        // ¿Cómo hacer para validar este campo?
        // if (cantArt.value < 1) {
        //     validafalla(cantArt, '')
        // } else {
        //     validok(cantArt)
        // }

        // Validación elegir forma de pago

        if (envioP.checked || envioE.checked || envioS.checked) {
            validok(envioP)
            validok(envioE)
            validok(envioS)
        } else {
            validafalla(envioP, 'Ingresa una forma de envío')
            validafalla(envioE, '')
            validafalla(envioS, '')
        }

        if (tarjCred.checked || trans.checked) {
            validok(tarjCred)
            validok(trans)
        } else {
            validafalla(document.getElementById("formaPago"), 'Ingresa una forma de envío')
            validafalla(tarjCred, '')
            validafalla(trans, '')
        }

        //  Validación campos forma de pago
        if (tarjCred.checked) {

            if (venTarj.value.length < 1) {
                validafalla(venTarj, 'Ingresa un número')
            } else {
                validok(venTarj)
            }
    
            if (numTarj.value.length < 1) {
                validafalla(numTarj, 'Ingresa un número')
            } else {
                validok(numTarj)
            }
    
            if (codeS.value.length < 1) {
                validafalla(codeS, 'Ingresa un número')
            } else {
                validok(codeS)
            }

        } else if (trans.checked) {
            if (cuenta.value.length < 1) {
                validafalla(cuenta, 'Ingresa un número')
            } else {
                validok(cuenta)
            }
        }

    }

})