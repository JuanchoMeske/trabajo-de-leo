// Esta capa SOLO escucha eventos y coordina.
// No hay ningun fetch aca adentro: eso vive en api.js.
// No hay ningun document.getElementById de la tabla: eso vive en ui.js.

let listaAnimes = [];

async function mostrarAnimes() {
    mostrarCargando(true);
    ocultarError();

    try {
        listaAnimes = await obtenerAnimes();
        pintarTabla(listaAnimes);
    } catch (error) {
        mostrarError(error.message);
    } finally {
        mostrarCargando(false);
    }
}

async function guardarAnime() {
    const id = obtenerIdDelFormulario();
    const datos = leerFormulario();

    mostrarCargando(true);
    ocultarError();

    try {
        if (id === "") {
            await crearAnime(datos);
        } else {
            await actualizarAnime(id, datos);
        }
        limpiarFormulario();
        await mostrarAnimes();
    } catch (error) {
        mostrarError(error.message);
    } finally {
        mostrarCargando(false);
    }
}

function cargarParaEditar(id) {
    const anime = listaAnimes.find(function (item) {
        return item.id === id;
    });

    if (anime) {
        llenarFormulario(anime);
        ocultarError();
    }
}

async function eliminarAnime(id) {
    if (!confirm("Seguro que querés borrar este anime?")) {
        return;
    }

    mostrarCargando(true);
    ocultarError();

    try {
        await borrarAnimeApi(id);
        limpiarFormulario();
        await mostrarAnimes();
    } catch (error) {
        mostrarError(error.message);
    } finally {
        mostrarCargando(false);
    }
}

document.getElementById("formAnime").addEventListener("submit", function (evento) {
    evento.preventDefault();
    guardarAnime();
});

document.getElementById("btnCancelar").addEventListener("click", function () {
    limpiarFormulario();
    ocultarError();
});

// Un solo listener para toda la tabla: los botones se crean despues,
// asi que se escucha al padre y se mira que boton se apreto.
document.getElementById("cuerpoTabla").addEventListener("click", function (evento) {
    const boton = evento.target;
    const accion = boton.dataset.accion;

    if (!accion) {
        return;
    }

    const id = Number(boton.dataset.id);

    if (accion === "editar") {
        cargarParaEditar(id);
    } else if (accion === "borrar") {
        eliminarAnime(id);
    }
});

mostrarAnimes();
