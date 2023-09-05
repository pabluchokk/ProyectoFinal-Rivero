class Usuario {
    constructor (nombre, contraseña) {
        this.nombre = nombre
        this.contraseña = contraseña
    }
}

const logeado = JSON.parse(localStorage.getItem("logeado"))

logeado ? mostrarPokemones() : formSesion()

function formSesion() {
    let usuario = document.getElementById("usuario")
    usuario.innerHTML = `
    <h2>Iniciar Sesión</h2>
    <form id="login">
    <label for="nombre">Nombre de Usuario:</label>
    <input type="text" id="nombre" required>
    <br>
    <label for="contraseña">Contraseña:</label>
    <input type="password" id="contraseña" required>
    <br>
    <button type="submit">Iniciar Sesión</button>
    </form>
    `;
}

let loginForm = document.getElementById("login")
loginForm.addEventListener("submit", function(e) {
    e.preventDefault()
    let nombre = document.getElementById("nombre").value
    let contraseña = document.getElementById("contraseña").value
    const usuario = new Usuario(nombre, contraseña)
    localStorage.setItem("logeado", JSON.stringify(usuario))
    location.reload
})