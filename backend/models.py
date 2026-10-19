from typing import Optional

from pydantic import BaseModel, Field


class AnimeBase(BaseModel):
    """Campos comunes y sus validaciones."""

    titulo: str = Field(min_length=1, max_length=100)
    estudio: str = Field(min_length=1, max_length=100)
    año: int = Field(ge=1900, le=2100)
    genero: str = Field(min_length=1, max_length=50)
    episodios: int = Field(ge=1, le=10000)
    visto: bool = False


class AnimeCrear(AnimeBase):
    """Lo que se manda en el POST. No lleva id porque lo genera SQLite."""
    pass


class AnimeActualizar(BaseModel):
    """Lo que se manda en el PUT. Todos los campos son opcionales,
    asi se puede mandar solo lo que cambio."""

    titulo: Optional[str] = Field(default=None, min_length=1, max_length=100)
    estudio: Optional[str] = Field(default=None, min_length=1, max_length=100)
    año: Optional[int] = Field(default=None, ge=1900, le=2100)
    genero: Optional[str] = Field(default=None, min_length=1, max_length=50)
    episodios: Optional[int] = Field(default=None, ge=1, le=10000)
    visto: Optional[bool] = None


class AnimeRespuesta(AnimeBase):
    """Lo que devuelve la API. Es igual al base pero con el id."""

    id: int
