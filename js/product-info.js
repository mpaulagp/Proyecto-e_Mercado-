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
    <h2>${data.name}</h2>
    <hr class="mb-4">
    
    <h4>Precio</h4>
    <p>${data.currency} ${data.cost}</p>   

    <h4>Descripción</h4>
    <p>${data.description}</p>

    <h4>Categoría</h4>
    <p>${data.category}</p>
    
    <h4>Cantidad de Vendidos</h4>
    <p>${data.soldCount}</p> 

    <h4>Imágenes Ilustrativas</h4>
    <div class="col-3">
        <img src="${data.images[0]}" alt="" class="img-thumbnail">
        <img src="${data.images[1]}" alt="" class="img-thumbnail">
        <img src="${data.images[2]}" alt="" class="img-thumbnail">
        <img src="${data.images[3]}" alt="" class="img-thumbnail">
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
        console.log(comment);
    
        for(let i = 0; i < comentariosArray.length; i++){
            let comentario = comentariosArray[i];
    
            let comentarioToAppend = "";
    
            comentarioToAppend += `
            
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${comentario.user} ${comentario.dateTime} ${comentario.score} </h4>
                        </div>
                        <p class="mb-1">${comentario.description}</p>
                    </div>
                </div>
            </div>
    
            `;
        
            document.getElementById("productComment").innerHTML += comentarioToAppend; 
        }
    
    }); 

    let botonEnviarComentario = document.getElementById("enviarComentario"); 

    botonEnviarComentario.addEventListener("click", function(evento) {
            evento.preventDefault();

    });

});

function addComment() {
    
    function newComment(usuario, puntuacion, opinion) {
        this.usuario = usuario;
        this.puntuacion = puntuacion;
        this.opinion = opinion;
    }

    console.log(newComment);

    var usuarioAgregar = localStorage.getItem("text");
    var puntuacionAgregar = document.getElementById("puntuacion").value;
    var opinionAgregar = document.getElementById("myOpinion").value;

    nuevoComentario = new newComment(usuarioAgregar, puntuacionAgregar, opinionAgregar);
    agregar();
}

var nuevosComentariosArray = [];

function agregar() {
    nuevosComentariosArray.push(nuevoComentario);
    document.getElementById("productComment").innerHTML += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${nuevoComentario.usuarioAgregar} ${nuevoComentario.puntuacionAgregar}</h4>
                    </div>
                    <p class="mb-1">${nuevoComentario.opinionAgregar}</p>
                </div>
            </div>
        </div>
        
        `;

}

console.log(nuevosComentariosArray);


// función en base del score te ponga la cantidad de estrellas correspondientes

// function puntuacion() {
//     let puntaje = comentario.score[i];

//     for (let i = 0; i < puntaje.length; i++){
//         if (i <= puntaje ){
//             <span class="fa fa-star checked"></span>
//         }else{
//             <span class="fa fa-star"></span>
//         }
//     };
// }

// console.log(puntaje);