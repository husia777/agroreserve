"""
Схемы для блюд (справочник школьного меню).
"""

from typing import Optional

from pydantic import BaseModel, Field


class DishIngredientSchema(BaseModel):
    """Ингредиент блюда."""

    product_id: Optional[str] = Field(
        None, description="ID товара в каталоге (опционально)")
    name: str = Field(..., description="Название ингредиента")
    qty_per_portion_g: float = Field(..., ge=0,
                                     description="Граммов на порцию")
    unit: str = Field("g", description="Единица измерения")


class DishCreate(BaseModel):
    """Создание блюда."""

    name: str = Field(..., min_length=2, max_length=200,
                      description="Название блюда")
    category: str = Field(...,
                          description="Категория: гарнир, суп, салат, второе, напиток, выпечка")
    description: Optional[str] = Field(None, description="Описание")
    ingredients: list[DishIngredientSchema] = Field(default_factory=list)
    portion_weight_g: float = Field(..., ge=0, description="Вес порции (г)")
    calories: float = Field(..., ge=0, description="Калорийность (ккал)")
    protein: float = Field(..., ge=0, description="Белки (г)")
    fat: float = Field(..., ge=0, description="Жиры (г)")
    carbs: float = Field(..., ge=0, description="Углеводы (г)")
    sanpin_compliant: bool = Field(True, description="Соответствует СанПиН")
    age_groups: list[str] = Field(default_factory=lambda: ["7-11", "12-18"])
    is_active: bool = Field(True)


class DishUpdate(BaseModel):
    """Обновление блюда."""

    name: Optional[str] = Field(None, min_length=2, max_length=200)
    category: Optional[str] = None
    description: Optional[str] = None
    ingredients: Optional[list[DishIngredientSchema]] = None
    portion_weight_g: Optional[float] = Field(None, ge=0)
    calories: Optional[float] = Field(None, ge=0)
    protein: Optional[float] = Field(None, ge=0)
    fat: Optional[float] = Field(None, ge=0)
    carbs: Optional[float] = Field(None, ge=0)
    sanpin_compliant: Optional[bool] = None
    age_groups: Optional[list[str]] = None
    is_active: Optional[bool] = None


class DishResponse(BaseModel):
    """Ответ с данными блюда."""

    id: str = Field(...)
    name: str
    category: str
    description: Optional[str] = None
    ingredients: list[DishIngredientSchema]
    portion_weight_g: float
    calories: float
    protein: float
    fat: float
    carbs: float
    sanpin_compliant: bool
    age_groups: list[str]
    is_active: bool
    created_at: str

    model_config = {"from_attributes": True, "populate_by_name": True}


class DishListResponse(BaseModel):
    """Список блюд с пагинацией."""

    items: list[DishResponse]
    total: int
    page: int
    limit: int
    pages: int
