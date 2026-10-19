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
