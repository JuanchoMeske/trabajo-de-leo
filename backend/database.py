import sqlite3

NOMBRE_BASE = "animes.db"


def crear_tabla():
    conexion = sqlite3.connect(NOMBRE_BASE)
    cursor = conexion.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS animes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            estudio TEXT NOT NULL,
            año INTEGER NOT NULL,
            genero TEXT NOT NULL,
            episodios INTEGER NOT NULL,
            visto INTEGER NOT NULL DEFAULT 0
        )
    """)
    conexion.commit()
    conexion.close()


# FastAPI llama a esta funcion con Depends() en cada peticion.
# El yield entrega la conexion al endpoint y el finally la cierra siempre,
# aunque el endpoint haya lanzado un error.
def get_db():
    conexion = sqlite3.connect(NOMBRE_BASE)
    conexion.row_factory = sqlite3.Row
    try:
        yield conexion
    finally:
        conexion.close()
