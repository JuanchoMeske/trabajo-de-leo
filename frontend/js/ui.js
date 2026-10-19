
function pintarTabla(animes) {
    const cuerpoTabla = document.getElementById("cuerpoTabla");
    cuerpoTabla.innerHTML = "";

    if (animes.length === 0) {
        const fila = document.createElement("tr");
        const celda = document.createElement("td");
        celda.colSpan = 7;
        celda.textContent = "Todavia no hay animes cargados.";
        celda.className = "tablaVacia";
        fila.appendChild(celda);
        cuerpoTabla.appendChild(fila);
        return;
    }

    for (let i = 0; i < animes.length; i++) {
        const anime = animes[i];
        const fila = document.createElement("tr");

        const valores = [
            anime.titulo,
            anime.estudio,
            anime.año,
            anime.genero,
            anime.episodios,
            anime.visto ? "Si" : "No"
        ];

        for (let j = 0; j < valores.length; j++) {
            const celda = document.createElement("td");
            celda.textContent = valores[j];
            fila.appendChild(celda);
        }

        const celdaAcciones = document.createElement("td");

        const botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";
        botonEditar.className = "botonAccion botonEditar";
        botonEditar.dataset.id = anime.id;
        botonEditar.dataset.accion = "editar";

        const botonBorrar = document.createElement("button");
        botonBorrar.textContent = "Borrar";
        botonBorrar.className = "botonAccion botonBorrar";
        botonBorrar.dataset.id = anime.id;
        botonBorrar.dataset.accion = "borrar";

        celdaAcciones.appendChild(botonEditar);
        celdaAcciones.appendChild(botonBorrar);
        fila.appendChild(celdaAcciones);

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
    document.getElementById("visto").checked = false;
    document.getElementById("btnGuardar").textContent = "Guardar";
}

function llenarFormulario(anime) {
    document.getElementById("idAnime").value = anime.id;
    document.getElementById("titulo").value = anime.titulo;
    document.getElementById("estudio").value = anime.estudio;
    document.getElementById("año").value = anime.año;
    document.getElementById("genero").value = anime.genero;
    document.getElementById("episodios").value = anime.episodios;
    document.getElementById("visto").checked = anime.visto;
    document.getElementById("btnGuardar").textContent = "Guardar cambios";
}

function leerFormulario() {
    return {
        titulo: document.getElementById("titulo").value,
        estudio: document.getElementById("estudio").value,
        año: Number(document.getElementById("año").value),
        genero: document.getElementById("genero").value,
        episodios: Number(document.getElementById("episodios").value),
        visto: document.getElementById("visto").checked
    };
}

function obtenerIdDelFormulario() {
    return document.getElementById("idAnime").value;
}

function mostrarCargando(estaCargando) {
    const cartel = document.getElementById("cargando");
    if (estaCargando) {
        cartel.classList.remove("oculto");
    } else {
        cartel.classList.add("oculto");
    }
}

function mostrarError(texto) {
    const cartel = document.getElementById("mensajeError");
    cartel.textContent = texto;
    cartel.classList.remove("oculto");
}

function ocultarError() {
    document.getElementById("mensajeError").classList.add("oculto");
}
