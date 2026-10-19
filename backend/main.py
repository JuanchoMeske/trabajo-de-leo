from typing import List

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import crear_tabla, get_db
from managers import AdministradorAnimes
from models import AnimeActualizar, AnimeCrear, AnimeRespuesta

app = FastAPI(title="AnimLOG API", description="CRUD de una biblioteca de anime")

# El frontend corre en otro puerto (5500 con Live Server), asi que para el
# navegador es otro origen. Sin esto el navegador bloquea las respuestas.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500", "http://localhost:5500"],
    allow_methods=["*"],
    allow_headers=["*"],
)

crear_tabla()


@app.get("/animes/todos", response_model=List[AnimeRespuesta])
def listar_animes(conexion=Depends(get_db)):
    admin = AdministradorAnimes(conexion)
    return admin.ver_todos()


@app.get("/animes/uno/{id}", response_model=AnimeRespuesta)
def obtener_anime(id: int, conexion=Depends(get_db)):
    admin = AdministradorAnimes(conexion)
    return admin.ver_uno(id)


@app.post("/animes/nuevo", response_model=AnimeRespuesta)
def crear_anime(anime: AnimeCrear, conexion=Depends(get_db)):
    admin = AdministradorAnimes(conexion)
    return admin.agregar(anime)


@app.put("/animes/editar/{id}", response_model=AnimeRespuesta)
def editar_anime(id: int, anime: AnimeActualizar, conexion=Depends(get_db)):
    admin = AdministradorAnimes(conexion)
    return admin.modificar(id, anime)


@app.delete("/animes/borrar/{id}")
def borrar_anime(id: int, conexion=Depends(get_db)):
    admin = AdministradorAnimes(conexion)
    admin.eliminar(id)
    return {"mensaje": "anime borrado"}
