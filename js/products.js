const PRODUCTS_API = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`
    // Hace que las funciones sean generales para todos los productos, no solo para los autos como en la entrega anterior

const ORDER_ASC_BY_PRICE = "PriceAsc";
const ORDER_DESC_BY_PRICE = "PriceDesc";
const ORDER_BY_RELEVANCE = "Relevance";
let currentProductsArray = [];
let currentSortCrit = undefined;
let minPrice = undefined;
let maxPrice = undefined;

function sortProducts(crit, arra){
    let result = [];

    if (crit === ORDER_ASC_BY_PRICE){
        result = arra.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });

    }else if (crit === ORDER_DESC_BY_PRICE){
        result = arra.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });

    }else if (crit === ORDER_BY_RELEVANCE){
        result = arra.sort(function(a, b) {
            let aRel = parseInt(a.soldCount);
            let bRel = parseInt(b.soldCount);

            if ( aRel > bRel ){ return -1; }
            if ( aRel < bRel ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList() {

fetch (PRODUCTS_API)
.then(function(response) {
    return response.json()
})
.then (function(datos) {
    currentProductsArray = datos.products;

    // let htmlContentToAppend = '';
    // for (let modelo of currentProductsArray) {
    //     htmlContentToAppend += `
    //     <div class="list-group-item list-group-item-action">
    //         <div class="row">
    //             <div class="col-3">
    //                 <img src="` + modelo.image + `" alt="product image" class="img-thumbnail">
    //             </div>
    //             <div class="col">
    //                 <div class="d-flex w-100 justify-content-between">
    //                     <div class="mb-1">
    //                     <h4>`+ modelo.name + ` - `+ modelo.currency +` `+ modelo.cost +`</h4> 
    //                     <p> `+ modelo.description +`</p> 
    //                     </div>
    //                     <small class="text-muted">` + modelo.soldCount + ` vendidos </small> 
    //                 </div>
    //             </div>
    //         </div>
    //     </div>`
    // }
//     document.getElementById("productslist").innerHTML = htmlContentToAppend;
// })
// }

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))){

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src=` + product.image + ` alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ product.name +` - `+product.currency +` `+ product.cost +` </h4> 
                        <p> `+ product.description +`</p> 
                        </div>
                        <small class="text-muted">` + product.soldCount + ` vendidos </small> 
                    </div>
                </div>
            </div>
        </div>
        `
        }
        document.getElementById("productslist").innerHTML = htmlContentToAppend; 
    }
})
}

console.log(currentProductsArray)

function sortAndShowProducts(sortCrit, productsArray){
    currentSortCrit = sortCrit;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCrit, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(evento){
    
fetch (PRODUCTS_API)
.then(function(respuesta) {
   return respuesta.json()
})
.then (function(datos) {
productsArray = datos.products;
   showProductsList()
});

    document.getElementById("priceAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("priceDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByRel").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_RELEVANCE);
    });

    document.getElementById("clearRangeFilterPrice").addEventListener("click", function(){
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterPrice").addEventListener("click", function(){

        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
            minPrice = parseInt(minPrice);
        }
        else{
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
            maxPrice = parseInt(maxPrice);
        }
        else{
            maxPrice = undefined;
        }

        showProductsList();
    });
});