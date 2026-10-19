from pydantic import BaseModel


class Anime(BaseModel):
    titulo: str
    estudio: str
    año: float
    genero: str
    episodios: str
