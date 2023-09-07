class Usuario {
    constructor(nombre, contraseña) {
    this.nombre = nombre;
    this.contraseña = contraseña;
    }
}

const logeado = JSON.parse(localStorage.getItem("logeado"));

logeado ? mostrarPokemones() : formSesion();

function formSesion() {
    let usuario = document.getElementById("usuario");
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

let loginForm = document.getElementById("login");
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let nombre = document.getElementById("nombre").value;
    let contraseña = document.getElementById("contraseña").value;
    const usuario = new Usuario(nombre, contraseña);
    localStorage.setItem("logeado", JSON.stringify(usuario));
    location.reload;
});

const url = "https://pokeapi.co/api/v2/pokemon/";

let buscador = document.getElementById("buscador");
buscador.innerHTML = `
<input type="text"  placeholder="Busca a tu pokemón..." id="nombrePokemon">

<button id="buscar">Atrapalo!</button>
`;

function buscarPokemon(nombre) {
    fetch(`${url}${nombre}`)
    .then((response) => response.json())
    .then((data) => {
        console.log("Datos de Pokemon:", data);
    })
    .catch((error) => console.error("Ocurrio un error al buscar en la API", error))
}

let buscar = document.getElementById("buscar")

buscar.addEventListener("click", (e) => {
    e.preventDefault()
    let nombrePokemon = document.getElementById("nombrePokemon").value.toLowerCase()
    buscarPokemon(nombrePokemon);
})