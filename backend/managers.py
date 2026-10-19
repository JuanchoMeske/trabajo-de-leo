class AdministradorAnimes:
    """Unica clase que habla con la base de datos.
    Recibe la conexion ya armada por Depends(get_db), asi que no la
    abre ni la cierra: de eso se encarga get_db."""

    def __init__(self, conexion):
        self.conexion = conexion

    def ver_todos(self):
        cursor = self.conexion.cursor()
        cursor.execute("SELECT * FROM animes ORDER BY id")
        filas = cursor.fetchall()

        resultado = []
        for fila in filas:
            resultado.append(self._fila_a_diccionario(fila))
        return resultado

    def ver_uno(self, id):
        cursor = self.conexion.cursor()
        cursor.execute("SELECT * FROM animes WHERE id = ?", (id,))
        fila = cursor.fetchone()

        if fila is None:
            return None
        return self._fila_a_diccionario(fila)

    def agregar(self, anime):
        cursor = self.conexion.cursor()
        cursor.execute(
            """INSERT INTO animes (titulo, estudio, año, genero, episodios, visto)
               VALUES (?, ?, ?, ?, ?, ?)""",
            (anime.titulo, anime.estudio, anime.año, anime.genero,
             anime.episodios, int(anime.visto))
        )
        self.conexion.commit()
        return self.ver_uno(cursor.lastrowid)

    def modificar(self, id, datos):
        actual = self.ver_uno(id)
        if actual is None:
            return None

        cambios = datos.model_dump(exclude_unset=True)

        titulo = cambios.get("titulo", actual["titulo"])
        estudio = cambios.get("estudio", actual["estudio"])
        año = cambios.get("año", actual["año"])
        genero = cambios.get("genero", actual["genero"])
        episodios = cambios.get("episodios", actual["episodios"])
        visto = cambios.get("visto", actual["visto"])

        cursor = self.conexion.cursor()
        cursor.execute(
            """UPDATE animes
               SET titulo = ?, estudio = ?, año = ?, genero = ?, episodios = ?, visto = ?
               WHERE id = ?""",
            (titulo, estudio, año, genero, episodios, int(visto), id)
        )
        self.conexion.commit()
        return self.ver_uno(id)

    def eliminar(self, id):
        cursor = self.conexion.cursor()
        cursor.execute("DELETE FROM animes WHERE id = ?", (id,))
        self.conexion.commit()
        return cursor.rowcount > 0

    def _fila_a_diccionario(self, fila):
        anime = dict(fila)
        anime["visto"] = bool(anime["visto"])
        return anime
