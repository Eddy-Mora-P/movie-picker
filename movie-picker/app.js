const firebaseConfig = {
  apiKey: "AIzaSyAbnfQNxED3PJxX56xRwpDuZQsoSB5Auzc",
  authDomain: "movie-picker-417c4.firebaseapp.com",
  projectId: "movie-picker-417c4",
  storageBucket: "movie-picker-417c4.appspot.com",
  messagingSenderId: "721484429672",
  appId: "1:721484429672:web:f43742c5a43437f9afbedd"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const coleccion = db.collection("peliculas");

let peliculas = [];

function cargarPeliculas() {

    coleccion.onSnapshot((snapshot) => {

        peliculas = [];

        snapshot.forEach(doc => {

            peliculas.push({
                id: doc.id,
                ...doc.data()
            });

        });

        mostrarPeliculas();

    });

}

function agregarPelicula() {

    const nombre = document.getElementById("nombre").value;
    const anio = document.getElementById("anio").value;
    const productor = document.getElementById("productor").value;

    if (nombre.trim() === "" || anio.trim() === "") return;

    coleccion.add({
        nombre,
        anio,
        productor
    });

    limpiarFormulario();

}

function mostrarPeliculas() {

    const contenedor = document.getElementById("listaPeliculas");

    contenedor.innerHTML = "";

    peliculas.forEach((pelicula) => {

        contenedor.innerHTML += `
            <div class="col-md-4">

                <div class="pelicula-card">

                    <h5>
                        ${pelicula.nombre}
                    </h5>

                    <p>
                        Año: ${pelicula.anio}
                    </p>

                    <p>
                        Productor:
                        ${pelicula.productor || "No especificado"}
                    </p>

                    <button class="btn btn-danger btn-sm"
                            onclick="eliminarPelicula('${pelicula.id}')">

                        Eliminar

                    </button>

                </div>

            </div>
        `;

    });

}

function eliminarPelicula(id) {

    coleccion.doc(id).delete();

}

function escogerPelicula() {

    if (peliculas.length === 0) return;

    const indice = Math.floor(Math.random() * peliculas.length);

    const pelicula = peliculas[indice];

    document.getElementById("resultado").innerHTML = `

        <div class="card p-3 resultado-card">

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

            <div class="d-flex gap-2 mt-3">

                <button class="btn btn-warning flex-fill"
                        onclick="confirmarVista('${pelicula.id}')">

                    Confirmar verla

                </button>

                <button class="btn btn-secondary flex-fill"
                        onclick="cancelarSeleccion()">

                    Cancelar

                </button>

            </div>

        </div>

    `;

}

function confirmarVista(id) {

    coleccion.doc(id).delete();

    document.getElementById("resultado").innerHTML = "";

}
function cancelarSeleccion() {

    document.getElementById("resultado").innerHTML = "";

}

function limpiarFormulario() {

    document.getElementById("nombre").value = "";
    document.getElementById("anio").value = "";
    document.getElementById("productor").value = "";

}

cargarPeliculas();