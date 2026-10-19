let listaAnimes = [];

function mostrarAnimes() {
    obtenerAnimes().then(function (datos) {
        listaAnimes = datos;
        pintarTabla(listaAnimes);
    });
}

function cargarParaEditar(id) {
    for (let i = 0; i < listaAnimes.length; i++) {
        if (listaAnimes[i].id === id) {
            llenarFormulario(listaAnimes[i]);
        }
    }
}

function eliminarAnime(id) {
    const confirmar = confirm("Seguro que querés borrar este anime?");
    if (confirmar) {
        borrarAnimeApi(id).then(function () {
            mostrarAnimes();
        });
    }
}

document.getElementById("formAnime").addEventListener("submit", function (evento) {
    evento.preventDefault();

    const id = document.getElementById("idAnime").value;

    const datos = {
        titulo: document.getElementById("titulo").value,
        estudio: document.getElementById("estudio").value,
        anio: Number(document.getElementById("anio").value),
        genero: document.getElementById("genero").value,
        episodios: document.getElementById("episodios").value
    };

    if (id === "") {
        crearAnime(datos).then(function () {
            limpiarFormulario();
            mostrarAnimes();
        });
    } else {
        actualizarAnime(id, datos).then(function () {
            limpiarFormulario();
            mostrarAnimes();
        });
    }
});

document.getElementById("btnCancelar").addEventListener("click", function () {
    limpiarFormulario();
});

mostrarAnimes();
