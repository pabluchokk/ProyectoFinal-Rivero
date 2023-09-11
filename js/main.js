// CONSTRUCTOR DEL USUARIO
class Usuario {
    constructor(nombre, contraseña) {
        this.nombre = nombre;
        this.contraseña = contraseña;
    }
}
// VERIFICADOR SI EL ITEM "LOGEADO" ESTA EN EL STORAGE

const logeado = JSON.parse(localStorage.getItem("logeado"));

logeado ? mostrarBuscador() : formSesion();

// FORMULARIO DE INICIO DE SESIÓN

function formSesion() {
    let usuario = document.getElementById("usuario");
    usuario.innerHTML = `
    <div id="login">
        <h2>Inicia Sesión y comienza a atrapar algunos Pokemon!</h2>
        <form id="login">
            <label for="nombre">Nombre de Usuario:</label>
            <input type="text" id="nombre" required>
            <br>
            <label for="contraseña">Contraseña:</label>
            <input type="password" id="contraseña" required>
            <br>
            <button type="submit" class="inicio">Iniciar Sesión</button>
        </form>
    </div>
    `;
            
            let loginForm = document.getElementById("login");
            loginForm.addEventListener("submit", function (e) {
                e.preventDefault();
                let nombre = document.getElementById("nombre").value;
                let contraseña = document.getElementById("contraseña").value;
                const usuario = new Usuario(nombre, contraseña);
                localStorage.setItem("logeado", JSON.stringify(usuario));
                location.reload();
            });
        }

    // FUNCION PARA MOSTRAR EL BUSCADOR DE POKEMON

    function mostrarBuscador() {
        let usuario = document.getElementById("usuario") // SALUDO Y BOTON DE CIERRE DE SESION
        usuario.innerHTML = `
            <div id="icon" class="cerrar">Bienvenido Entrenador ${logeado.nombre} | 
                <button class="logout" id="icon" onclick="cerrarSesion()">Cerrar sesión <i id="icon" class="fa-sharp fa-solid fa-right-from-bracket"></i></button>
            </div>
            `;
    
    let icon = document.getElementById("icon")
    icon.style.position = "absolute";
    icon.style.top = "10px"
    icon.style.right = "10px"
    
    let buscador = document.getElementById("buscador") // BUSCADOR DE POKEMON
    buscador.innerHTML = ` 
        <input type="text" placeholder="Busca a tu pokemón..." id="nombrePokemon">
        <button id="buscar">Atrapalo!</button>
        `;
    let buscar = document.getElementById("buscar")
    buscar.addEventListener("click", (e) => {
        e.preventDefault()
        let nombrePokemon = document.getElementById("nombrePokemon").value.toLowerCase()
        buscarPokemon(nombrePokemon)
    })
    buscador.style.display = "block"
    let equipo = document.getElementById("equipo")
    equipo.style.display = "block";
}

// CIERRE DE SESION

function cerrarSesion() { 
    localStorage.removeItem("logeado")
    location.reload()
}

// API, EN ESTE CASO LA "PokeAPI"

const url = "https://pokeapi.co/api/v2/pokemon/";

let buscador = document.getElementById("buscador");
buscador.innerHTML = `
<input type="text" placeholder="Busca a tu pokemón..." id="nombrePokemon">
<button id="buscar">Atrapalo!</button>
`;

// CONEXION A LA API PARA BUSCAR POKEMON 

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

// ALERTA DE DATOS CON SWEET ALERT 

function buscarDatos(data) {
    let mayuscula = data.name.charAt(0).toUpperCase() + data.name.slice(1); // PARA QUE EL NOMBRE EMPIECE CON MAYUSCULA

    let altura = data.height / 10; // PARA TRANSFORMAR LA ALTURA A METROS
    let peso = data.weight / 10; // PARA TRANSFORMAR EL PESO EN KILOS

    let mensaje = `<img src="${data.sprites.front_default}" alt="Imagen del Pokémon" style="width: 150px; height: auto; display: block; margin: 0 auto;"><br>`; // PARA MOSTRAR EN EL MENSAJE EL SPRITE (IMAGEN) DEL POKEMON BUSCADO
    mensaje += `Nombre: ${mayuscula} <br>`;
    mensaje += `N° de la Pokedex: ${data.id} <br>`;
    mensaje += `Altura: ${altura} m <br>`;
    mensaje += `Peso: ${peso} kg <br>`;
    mensaje += `<button id="agregar" onclick="agregarEquipo('${mayuscula}')">Añadir al Equipo</button>`;  // BOTON PARA AGREGAR POKEMON AL EQUIPO

    // MENSAJE CON SWEET ALERT
    Swal.fire({
    title: "Pokemon atrapado!",
    html: mensaje,
    icon: "success",
});
}

// EVENTO PARA EJECUTAR LA FUNCION PARA BUSCAR AL POKEMON
let buscar = document.getElementById("buscar");
buscar.addEventListener("click", (e) => {
    e.preventDefault();
    let nombrePokemon = document.getElementById("nombrePokemon").value.toLowerCase();
    buscarPokemon(nombrePokemon);
});

// ARREGLO INICIAL DEL EQUIPO

let equipoPokemon = []

// AGREGAR POKEMON AL EQUIPO

function agregarEquipo(nombrePokemon) {
    if (equipoPokemon.length < 6) { // LÍMITE DE 6 POKEMON EN UN EQUIPO
    equipoPokemon.push(nombrePokemon)
    actualizar()

    Swal.fire({
            title: "Éxito",
            text: `${nombrePokemon} ha sido añadido a tu equipo Pokémon.`,
            icon: "success"
    })
    } else { 
        Swal.fire({
            title: "Equipo Pokémon Lleno",
            text: "Tu equipo Pokémon ya tiene 6 Pokémon. Prueba librar algunos combates!",
            icon: "warning"
        })
    }
}

// FUNCION PARA QUE MUESTRE LOS POKEMON EN LA LISTA AL COSTADO

function actualizar () {
    let contador = document.getElementById("contador")
    contador.textContent = equipoPokemon.length

    let lista = document.getElementById("lista")
    while(lista.firstChild) {
        lista.removeChild(lista.firstChild)
    }

    equipoPokemon.forEach((nombrePokemon) => {
        let list = document.createElement("li")
        list.textContent = nombrePokemon
        lista.appendChild(list)
    })
}

let eliminar = document.getElementById("eliminar")
eliminar.addEventListener("click", eliminarUltimo)

function eliminarUltimo() {
    if (equipoPokemon.length > 0) {
        equipoPokemon.pop()
        actualizar()
    } else {
        Swal.fire ({
            title:"Equipo Pokémon Vacío",
            text: "No hay Pokémon en tu equipo para liberar.",
            icon: "info"
        })
    }
}