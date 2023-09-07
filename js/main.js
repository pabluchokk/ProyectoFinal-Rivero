class Usuario {
    constructor(nombre, contraseña) {
    this.nombre = nombre;
    this.contraseña = contraseña;
    }
}

const logeado = JSON.parse(localStorage.getItem("logeado"));

logeado ? mostrarBuscador() : formSesion();

function formSesion() {
    let usuario = document.getElementById("usuario");
    usuario.innerHTML = `
    <div id="login">
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
    </div>
    `;

let login = document.getElementById("login");
login.style.display = "flex";
login.style.flexDirection = "column";
login.style.alignItems = "center";
login.style.justifyContent = "center";
}

let loginForm = document.getElementById("login");
loginForm.addEventListener("submit", function (e) {
e.preventDefault();
let nombre = document.getElementById("nombre").value;
let contraseña = document.getElementById("contraseña").value;
const usuario = new Usuario(nombre, contraseña);
localStorage.setItem("logeado", JSON.stringify(usuario));
location.reload();
});

function mostrarBuscador() {
    let usuario = document.getElementById("usuario");
    usuario.innerHTML = `
    <div id="icono" onclick="cerrarSesion()">
    <i class="fas fa-user></i>
    </div>
    `;
let icono = document.getElementById("icono");
    icono.style.top = "10px";
    icono.style.right = "10px";
    icono.style.cursor = "pointer";
}

function cerrarSesion() {
    localStorage.removeItem("logeado");
    location.reload();
}

const url = "https://pokeapi.co/api/v2/pokemon/";

let buscador = document.getElementById("buscador");
buscador.innerHTML = `
<input type="text" placeholder="Busca a tu pokemón..." id="nombrePokemon">
<button id="buscar">Atrapalo!</button>
`;

function buscarDatos(data) {
    let mayuscula = data.name.charAt(0).toUpperCase() + data.name.slice(1);

    let altura = data.height / 10;
    let peso = data.weight / 10;

    let mensaje = `<img src="${data.sprites.front_default}" alt="Imagen del Pokémon" style="width: 150px; height: auto; display: block; margin: 0 auto;"><br>`;
    mensaje += `Nombre: ${mayuscula} <br>`;
    mensaje += `N° de la Pokedex: ${data.id} <br>`;
    mensaje += `Altura: ${altura} m <br>`;
    mensaje += `Peso: ${peso} kg <br>`;

    Swal.fire({
    title: "Pokemon atrapado!",
    html: mensaje,
    icon: "success",
    });
}

function buscarPokemon(nombre) {
    fetch(`${url}${nombre}`)
    .then((response) => response.json())
    .then((data) => {
        buscarDatos(data);
    })
    .catch((error) => {
        Swal.fire({
        title: "Error!",
        text: "Al parecer ocurrió un error al buscar en la Pokedex",
        icon: "error",
        footer: "Al parecer este pokemon aún no fue descubierto...",
        });
        console.error("Ocurrió un error al buscar en la API:", error);
    });
}
let buscar = document.getElementById("buscar");

buscar.addEventListener("click", (e) => {
    e.preventDefault();
    let nombrePokemon = document
    .getElementById("nombrePokemon")
    .value.toLowerCase();
    buscarPokemon(nombrePokemon);
});
