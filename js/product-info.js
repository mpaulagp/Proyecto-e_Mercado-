const PRODUCT_INFO_API = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem("prodID")}.json`
//  URL de la información de los productos, de forma general para todos. 
const PRODUCT_INFO_COMMENTS_API = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem("prodID")}.json`;

fetch (PRODUCT_INFO_API)
.then(function(response) {
return response.json()
})
.then (function(data) {

    let htmlContentToAppend = "";

    htmlContentToAppend += `
    <h2 class="py-4 my-0">${data.name}</h2>
    <hr class="mt-0">
    
    <p class="my-0"><strong>Precio</strong></p>
    <p>${data.currency} ${data.cost}</p>   

    <p class="my-0"><strong>Descripción</strong></p>
    <p>${data.description}</p>

    <p class="my-0"><strong>Categoría</strong></p>
    <p>${data.category}</p>
    
    <p class="my-0"><strong>Cantidad de Vendidos</strong></p>
    <p>${data.soldCount}</p> 

    <p class="my-0"><strong>Imágenes Ilustrativas</strong></p>
    
    <div id="carouselExampleControls" class="carousel carousel-dark slide w-100" data-bs-ride="carousel">
    <div class="carousel-inner"> 
        <div class="carousel-item active">
            <div class="d-flex justify-content-center">
                <img src="${data.images[0]}" class="w-50" alt="...">
            </div>
        </div>
        <div class="carousel-item">
            <div class="d-flex justify-content-center">
                <img src="${data.images[1]}" class="w-50" alt="...">
            </div>        
        </div>
        <div class="carousel-item">
            <div class="d-flex justify-content-center">
                <img src="${data.images[2]}" class="w-50" alt="...">
            </div>
        </div>
        <div class="carousel-item">
            <div class="d-flex justify-content-center">
                <img src="${data.images[3]}" class="w-50" alt="...">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
    </div>

    <br></br>

    <div class="row">
        <div class="col">
            <img src="${data.images[0]}" alt="" class="img-thumbnail">
        </div>
        <div class="col">
            <img src="${data.images[1]}" alt="" class="img-thumbnail">
        </div>
        <div class="col">
            <img src="${data.images[2]}" alt="" class="img-thumbnail">
        </div>
        <div class="col">
            <img src="${data.images[3]}" alt="" class="img-thumbnail">
        </div>
    </div>

    <hr class="mb-4">
    
    <h4>Comentarios</h4>

    `;
        
    document.getElementById("productInfo").innerHTML = htmlContentToAppend; 

    let comentariosArray = [];

    fetch (PRODUCT_INFO_COMMENTS_API)
    .then(function(respuesta) {
    return respuesta.json()
    })
    .then (function(comment) {
        comentariosArray = comment;
    
        for(let i = 0; i < comentariosArray.length; i++){
            let comentario = comentariosArray[i];
    
            let comentarioToAppend = "";
    
            comentarioToAppend += `
            
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <p class="h6"><strong>${comentario.user}</strong> - ${comentario.dateTime} - Puntuación: <mark>${comentario.score}/5</mark></p>
                        </div>
                        <p class="mb-1">${comentario.description}</p>
                    </div>
                </div>
            </div>
    
            `;
        
            document.getElementById("productComment").innerHTML += comentarioToAppend; 
        }
    
    }); 

    let nuevoComentario = []; 
    let botonEnviarComentario = document.getElementById("enviarComentario"); 

    botonEnviarComentario.addEventListener("click", function(evento) {
        let opinion = document.getElementById("myOpinion").value;
        let puntuacion = document.getElementById("puntuacion").value;
        let newuser = localStorage.getItem("text");

        if (opinion) {
            evento.preventDefault();

            nuevoComentario.push( [{
                description: opinion,
                score: puntuacion,
                user: newuser
            }]);

            document.getElementById("productComment").innerHTML += `
            <div class="list-group-item list-group-item-action">
                    <div class="row">
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                            <p class="h6"><strong>${newuser}</strong> - Puntuación: <mark>${puntuacion}/5</mark></p>
                            </div>
                            <p class="mb-1">${opinion}</p>
                        </div>
                    </div>
                </div>
        
                `;
        }

    });

    //se creó un for que recorra el array que contiene los productos relacionados y que muestre lo requerido 

    let prodRelacionadoAMostrar = "";

    for (let prodRel of data.relatedProducts) {

        prodRelacionadoAMostrar += `
        <div class="col-md-4">
            <div onclick="setProdID(${prodRel.id})" class="card mb-4 shadow-sm custom-card cursor-active">
            <img class="bd-placeholder-img card-img-top" src="${prodRel.image}"
                alt="Imgagen representativa del producto relacionado '${prodRel.name}'.">
            <div class="card-body">
                <p class="card-text">${prodRel.name}</p>
            </div>
            </div>
        </div>
        `
    }

    document.getElementById("productosRelacionados").innerHTML += prodRelacionadoAMostrar;

});

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}
// se sobre escribe el seteado del prodId para que te redireccione a la pagina de dicho producto
//Luego se llama a la función en el onclick del div que contiene el id

// Función en base del score te ponga la cantidad de estrellas correspondientes
// Se deben añadir tantas estrellitas como sea la cantidad de score, con máximo 5.
// En caso de que score sea menor a 5, la estrellitas sobrantes deberán ser de color negro.