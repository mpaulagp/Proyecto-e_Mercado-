document.getElementById("login-form").addEventListener('submit', function(evento) {

    var campos = document.getElementsByClassName('form-control');
    var valid = true

    for (let i = 0; i < campos.length; i++) {
        if (!campos[i].value.length > 0) {
            valid = false;
        }
    }
    
    if (valid) {
        evento.preventDefault();
        window.location.href = 'home.html';
    } else {
        evento.preventDefault();
        alert(
            'Los campos de Usuario y/o Constraseña están vacíos. Por favor agregar un Usuario y/o Contraseña para ingresar');
    }
})

const inputEmail = document.getElementById("email")
const buttonText = document.getElementById("submit")

buttonText.addEventListener("click", (e) => {
    // Si tenemos texto ingresado en el email, lo guardamos en el localStorage
    // Solución:
    if (inputEmail.value) { 
        localStorage.setItem("text", inputEmail.value);
    } else {
        alert("Por favor, ingresa un texto");
    }
});