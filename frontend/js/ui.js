function pintarTabla(animes) {
    const cuerpoTabla = document.getElementById("cuerpoTabla");
    cuerpoTabla.innerHTML = "";

    for (let i = 0; i < animes.length; i++) {
        const anime = animes[i];

        const fila = document.createElement("tr");

        fila.innerHTML =
            "<td>" + anime.titulo + "</td>" +
            "<td>" + anime.estudio + "</td>" +
            "<td>" + anime.año + "</td>" +
            "<td>" + anime.genero + "</td>" +
            "<td>" + anime.episodios + "</td>" +
            "<td>" +
                "<button class='botonAccion botonEditar' onclick='cargarParaEditar(" + anime.id + ")'>Editar</button>" +
                "<button class='botonAccion botonBorrar' onclick='eliminarAnime(" + anime.id + ")'>Borrar</button>" +
            "</td>";

        cuerpoTabla.appendChild(fila);
    }
}

function limpiarFormulario() {
    document.getElementById("idAnime").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("estudio").value = "";
    document.getElementById("año").value = "";
    document.getElementById("genero").value = "";
    document.getElementById("episodios").value = "";
}

function llenarFormulario(anime) {
    document.getElementById("idAnime").value = anime.id;
    document.getElementById("titulo").value = anime.titulo;
    document.getElementById("estudio").value = anime.estudio;
    document.getElementById("año").value = anime.año;
    document.getElementById("genero").value = anime.genero;
    document.getElementById("episodios").value = anime.episodios;
}
