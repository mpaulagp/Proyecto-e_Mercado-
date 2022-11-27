if (!(username)) {
    window.location.href = 'index.html';
}

let email = document.getElementById("divEmail")
const formPerfil = document.getElementById("perfil")
const primNombre = document.getElementById("primerNombre")
const segNombre = document.getElementById("segundoNombre")
const primApellido = document.getElementById("primerApellido")
const segApellido = document.getElementById("segundoApellido")
const contacto = document.getElementById("telContacto")
const fotoPerfil = document.getElementById("photoPerfil")
const tumbnailPhoto = document.getElementById("profileImg") 
const imageURL = localStorage.getItem("ProfIMG");

email.innerHTML = `
    <label class="form-control-label">Email *</label>
    <input type="email" class="form-control" id="emailPerfil" value="${localStorage.getItem("text")}" required>
    `
    
if (localStorage.getItem("PrimNom")) {
    primNombre.value = localStorage.getItem("PrimNom");
}

if (localStorage.getItem("SegNom")) {
    segNombre.value = localStorage.getItem("SegNom");
}

if (localStorage.getItem("PrimApell")) {
    primApellido.value = localStorage.getItem("PrimApell");
}
    
if (localStorage.getItem("SegApell")) {
    segApellido.value = localStorage.getItem("SegApell");
}

if (localStorage.getItem("Tel")) {
    contacto.value = localStorage.getItem("Tel");
}

if (localStorage.getItem("Tel")) {
    contacto.value = localStorage.getItem("Tel");
}

if (imageURL) {
    tumbnailPhoto.setAttribute("src", imageURL)
} else {
    tumbnailPhoto.setAttribute("src", "img/img_perfil.png")
}

formPerfil.addEventListener('submit', function (event) {
    if (!formPerfil.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
    }

    formPerfil.classList.add('was-validated');

    if (primNombre.value) {
        localStorage.setItem("PrimNom", primNombre.value);
    } else if (primNombre.value.length === 0 ){
        localStorage.removeItem("PrimNom");
    }

    if (segNombre.value) {
        localStorage.setItem("SegNom", segNombre.value);
    } else if (segNombre.value.length === 0 ){
        localStorage.removeItem("SegNom");
    }

    if (primApellido.value) {
        localStorage.setItem("PrimApell", primApellido.value);
    } else if (primApellido.value.length === 0 ){
        localStorage.removeItem("PrimApell");
    }
    
    if (segApellido.value) {
        localStorage.setItem("SegApell", segApellido.value);
    } else if (segApellido.value.length === 0 ){
        localStorage.removeItem("SegApell");
    }

    if (contacto.value) {
        localStorage.setItem("Tel", contacto.value);
    } else if (contacto.value.length === 0 ){
        localStorage.removeItem("Tel");
    }

    fotoPerfil.addEventListener("change", function (e) {
        const reader = new FileReader(); 

        reader.addEventListener("load", () => {
            localStorage.setItem("ProfIMG", reader.result);
        })

        reader.readAsDataURL(this.files[0]);
        console.log(reader.files[0]);
    })
})
