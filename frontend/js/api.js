const URL_BASE = "http://127.0.0.1:8000";

function armarMensajeDeValidacion(cuerpo) {
    if (!cuerpo || !Array.isArray(cuerpo.detail)) {
        return "Los datos enviados no son validos.";
    }

    const errores = cuerpo.detail.map(function (error) {
        const campo = error.loc[error.loc.length - 1];
        return campo + ": " + error.msg;
    });

    return "Revisa estos campos -> " + errores.join(" | ");
}

async function pedirALaApi(url, opciones) {
    let respuesta;

    try {
        respuesta = await fetch(url, opciones);
    } catch (error) {
        throw new Error("No se pudo conectar con la API. Fijate que el backend este corriendo en " + URL_BASE);
    }

    if (respuesta.status === 422) {
        const cuerpo = await respuesta.json();
        throw new Error(armarMensajeDeValidacion(cuerpo));
    }

    if (!respuesta.ok) {
        throw new Error("La API respondio con un error (" + respuesta.status + ").");
    }

    return await respuesta.json();
}

function obtenerAnimes() {
    return pedirALaApi(URL_BASE + "/animes/todos");
}

function crearAnime(datos) {
    return pedirALaApi(URL_BASE + "/animes/nuevo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    });
}

function actualizarAnime(id, datos) {
    return pedirALaApi(URL_BASE + "/animes/editar/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    });
}

function borrarAnimeApi(id) {
    return pedirALaApi(URL_BASE + "/animes/borrar/" + id, {
        method: "DELETE"
    });
}
