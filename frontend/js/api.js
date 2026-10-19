const URL_BASE = "http://127.0.0.1:8000";

function obtenerAnimes() {
    return fetch(URL_BASE + "/animes/todos")
        .then(function (respuesta) {
            return respuesta.json();
        });
}

function crearAnime(datos) {
    return fetch(URL_BASE + "/animes/nuevo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    });
}

function actualizarAnime(id, datos) {
    return fetch(URL_BASE + "/animes/editar/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    });
}

function borrarAnimeApi(id) {
    return fetch(URL_BASE + "/animes/borrar/" + id, {
        method: "DELETE"
    });
}
