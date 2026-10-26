from typing import Optional

from pydantic import BaseModel, Field


class AnimeBase(BaseModel):

    titulo: str = Field(min_length=1, max_length=100)
    estudio: str = Field(min_length=1, max_length=100)
    año: int = Field(ge=1900, le=2100)
    genero: str = Field(min_length=1, max_length=50)
    episodios: int = Field(ge=1, le=10000)
    visto: bool = False


class AnimeCrear(AnimeBase):
    pass


class AnimeActualizar(BaseModel):

    titulo: Optional[str] = Field(default=None, min_length=1, max_length=100)
    estudio: Optional[str] = Field(default=None, min_length=1, max_length=100)
    año: Optional[int] = Field(default=None, ge=1900, le=2100)
    genero: Optional[str] = Field(default=None, min_length=1, max_length=50)
    episodios: Optional[int] = Field(default=None, ge=1, le=10000)
    visto: Optional[bool] = None


class AnimeRespuesta(AnimeBase):


    id: int
