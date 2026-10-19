from pydantic import BaseModel


class Anime(BaseModel):
    titulo: str
    estudio: str
    anio: float
    genero: str
    episodios: str
