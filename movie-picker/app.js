let peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];

mostrarPeliculas();

function agregarPelicula() {

    const nombre = document.getElementById("nombre").value;

    const anio = document.getElementById("anio").value;

    const productor = document.getElementById("productor").value;

    if (nombre.trim() === "" || anio.trim() === "") {
        return;
    }

    const pelicula = {
        id: Date.now(),
        nombre,
        anio,
        productor
    };

    peliculas.push(pelicula);

    guardarDatos();

    mostrarPeliculas();

    limpiarFormulario();
}

function mostrarPeliculas() {

    const contenedor = document.getElementById("listaPeliculas");

    contenedor.innerHTML = "";

    peliculas.forEach((pelicula) => {

        contenedor.innerHTML += `
            <div class="col-md-4">

                <div class="pelicula-card">

                    <h5>${pelicula.nombre}</h5>

                    <p>Año: ${pelicula.anio}</p>

                    <p>
                        Productor:
                        ${pelicula.productor || "No especificado"}
                    </p>

                    <button class="btn btn-danger btn-sm"
                            onclick="eliminarPelicula(${pelicula.id})">

                        Eliminar

                    </button>

                </div>

            </div>
        `;
    });
}

function eliminarPelicula(id) {

    peliculas = peliculas.filter(
        (pelicula) => pelicula.id !== id
    );

    guardarDatos();

    mostrarPeliculas();
}

function escogerPelicula() {

    if (peliculas.length === 0) {
        return;
    }

    const indice = Math.floor(
        Math.random() * peliculas.length
    );

    const pelicula = peliculas[indice];

    const resultado =
        document.getElementById("resultado");

    resultado.innerHTML = `
        <div class="card p-3">

            <h3>
                Película seleccionada
            </h3>

            <h4>
                ${pelicula.nombre}
            </h4>

            <p>
                Año: ${pelicula.anio}
            </p>

            <p>
                Productor:
                ${pelicula.productor || "No especificado"}
            </p>

            <button class="btn btn-warning"
                    onclick="confirmarVista(${pelicula.id})">

                Confirmar verla

            </button>

        </div>
    `;
}

function confirmarVista(id) {

    peliculas = peliculas.filter(
        (pelicula) => pelicula.id !== id
    );

    guardarDatos();

    mostrarPeliculas();

    document.getElementById(
        "resultado"
    ).innerHTML = "";
}

function guardarDatos() {

    localStorage.setItem(
        "peliculas",
        JSON.stringify(peliculas)
    );
}

function limpiarFormulario() {

    document.getElementById("nombre").value = "";

    document.getElementById("anio").value = "";

    document.getElementById("productor").value = "";
}