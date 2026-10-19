import sqlite3


def obtener_conexion():
    conexion = sqlite3.connect("animes.db")
    conexion.row_factory = sqlite3.Row
    return conexion


def crear_tabla():
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS animes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT,
            estudio TEXT,
            año REAL,
            genero TEXT,
            episodios TEXT
        )
    """)
    conexion.commit()
    conexion.close()
