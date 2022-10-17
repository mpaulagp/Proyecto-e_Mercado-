const CART_INFO_API = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

articlesInCart = []

fetch (CART_INFO_API)
.then(function(response) {
return response.json()
})
.then (function(data) {

    articlesInCart = data;

    for(let i = 0; i < articlesInCart.articles.length; i++){

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
        }

        document.getElementById("cantArticle").addEventListener("change", function(){
            cantidad = this.value;
            subtotal(cantidad);
        });

    }
    
})   