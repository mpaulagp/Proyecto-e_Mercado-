const PRODUCTS_API = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`
    // Hace que las funciones sean generales para todos los productos, no solo para los autos como en la entrega anterior

const ORDER_ASC_BY_PRICE = "PriceAsc";
const ORDER_DESC_BY_PRICE = "PriceDesc";
const ORDER_BY_RELEVANCE = "Relevance";
let currentProductsArray = [];
let minPrice = undefined;
let maxPrice = undefined;

function showProductsList() {
    
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
}

document.addEventListener("DOMContentLoaded", function(){
    
fetch (PRODUCTS_API)
.then(function(response) {
   return response.json()
})
.then (function(data) {
currentProductsArray = data.products;
   showProductsList()
});

    document.getElementById("priceAsc").addEventListener("click", function(){
        currentProductsArray.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
        showProductsList();
    });

    document.getElementById("priceDesc").addEventListener("click", function(){
        currentProductsArray.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
        showProductsList();
    });

    document.getElementById("sortByRel").addEventListener("click", function(){
        currentProductsArray.sort(function(a, b) {
            let aRel = parseInt(a.soldCount);
            let bRel = parseInt(b.soldCount);

            if ( aRel > bRel ){ return -1; }
            if ( aRel < bRel ){ return 1; }
            return 0;  
        });
        showProductsList();  
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