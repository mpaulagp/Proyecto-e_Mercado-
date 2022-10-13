const CART_INFO_API = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

articlesInCart = []

fetch (CART_INFO_API)
.then(function(response) {
return response.json()
})
.then (function(data) {

    articlesInCart = data;
    console.log(articlesInCart)

    function subtotal() {
        let subtotValue = document.getElementById("cantArticle").value
        let subtotHTML = subtotValue * articlesInCart.articles.unitCost

        document.getElementById("subt").innerHTML = subtotHTML;
    }

    for(let i = 0; i < articlesInCart.articles.length; i++){
        let article = articlesInCart.articles[i];

        let htmlContentToAppend = "";

        htmlContentToAppend += `
            <tr>
                <td><img src="${article.image}" style="width: 50px"></td>
                <td>${article.name}</td>
                <td>${article.currency} ${article.unitCost}</td>
                <td><input type="numer" class="form-control w-25" id="cantArticle" required value="1" min="0"></td>
                <td><strong id="subt">${article.currency}</strong></td>

            </tr>
        `

        document.getElementById("cartTable").innerHTML = htmlContentToAppend;
    }

    document.getElementById("cantArticle").addEventListener("change", function(){
        subtotValue = this.value;
        subtotal();
    });

    
})   