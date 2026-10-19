from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models import Anime
from managers import AdministradorAnimes
from database import crear_tabla

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500", "http://localhost:5500"],
    allow_methods=["*"],
    allow_headers=["*"],
)

crear_tabla()
admin = AdministradorAnimes()


@app.post("/animes/nuevo")
def crear_anime(anime: Anime):
    admin.agregar(anime)
    return {"mensaje": "anime agregado"}


@app.put("/animes/editar/{id}")
def editar_anime(id: int, anime: Anime):
    admin.modificar(id, anime)
    return {"mensaje": "anime modificado"}


@app.delete("/animes/borrar/{id}")
def borrar_anime(id: int):
    admin.eliminar(id)
    return {"mensaje": "anime borrado"}


@app.get("/animes/todos")
def listar_animes():
    return admin.ver_todos()


@app.get("/animes/uno/{id}")
def obtener_anime(id: int):
    return admin.ver_uno(id)
