const PRODUCTS_API = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`
    // Hace que las funciones sean generales para todos los productos, no solo para los autos como en la entrega anterior

let currentProductsArray = [];
let minPrice = undefined;
let maxPrice = undefined;

let searchProd = undefined;

function showProductsList() {
    
    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice)) && (( searchProd == undefined || searchProd != undefined
            ))){

        htmlContentToAppend += `
        <div onclick="setProdID(${product.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost} </h4>
                        <small class="text-muted">${product.soldCount} artículos</small>
                    </div>
                    <p class="mb-1">${product.description}</p>
                </div>
            </div>
        </div>
        `

        }
        document.getElementById("productslist").innerHTML = htmlContentToAppend; 

    }
}

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
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

//funcionalidad en desarrollo...
    document.getElementById("btnBuscar").addEventListener("click", function() {

        let input = document.getElementById('form1').value;
        input = input.toLowerCase();
    
        console.log(currentProductsArray);
          
        for (let prodBusc of currentProductsArray) {
    
            if (prodBusc.name.toLowerCase().includes(input)
                || prodBusc.description.toLowerCase().includes(input)) {
                    
                searchProd = input            
                
                } else {
    
                searchProd = undefined
                   
            }
            
            
        }

        showProductsList();
    })

});