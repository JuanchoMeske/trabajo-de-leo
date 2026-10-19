from database import obtener_conexion


class AdministradorAnimes:

    def agregar(self, anime):
        conexion = obtener_conexion()
        cursor = conexion.cursor()
        cursor.execute(
            "INSERT INTO animes (titulo, estudio, anio, genero, episodios) VALUES (?, ?, ?, ?, ?)",
            (anime.titulo, anime.estudio, anime.anio, anime.genero, anime.episodios)
        )
        conexion.commit()
        conexion.close()

    def modificar(self, id, anime):
        conexion = obtener_conexion()
        cursor = conexion.cursor()
        cursor.execute(
            "UPDATE animes SET titulo=?, estudio=?, anio=?, genero=?, episodios=? WHERE id=?",
            (anime.titulo, anime.estudio, anime.anio, anime.genero, anime.episodios, id)
        )
        conexion.commit()
        conexion.close()

    def eliminar(self, id):
        conexion = obtener_conexion()
        cursor = conexion.cursor()
        cursor.execute("DELETE FROM animes WHERE id=?", (id,))
        conexion.commit()
        conexion.close()

    def ver_todos(self):
        conexion = obtener_conexion()
        cursor = conexion.cursor()
        cursor.execute("SELECT * FROM animes")
        filas = cursor.fetchall()
        conexion.close()

        resultado = []
        for fila in filas:
            resultado.append(dict(fila))
        return resultado

    def ver_uno(self, id):
        conexion = obtener_conexion()
        cursor = conexion.cursor()
        cursor.execute("SELECT * FROM animes WHERE id=?", (id,))
        fila = cursor.fetchone()
        conexion.close()

        if fila:
            return dict(fila)
        return None
