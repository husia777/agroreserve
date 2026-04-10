# Пакет Pydantic v2 схем для запросов и ответов API
# v1 схемы
from app.schemas.auth import *  # noqa: F403
from app.schemas.certificate import *  # noqa: F403

# v2 схемы (Группы 1-3)
from app.schemas.contract import *  # noqa: F403
from app.schemas.dish import *  # noqa: F403
from app.schemas.finance import *  # noqa: F403
from app.schemas.menu import *  # noqa: F403
from app.schemas.order import *  # noqa: F403
from app.schemas.product import *  # noqa: F403
from app.schemas.reminder import *  # noqa: F403
from app.schemas.standing_order import *  # noqa: F403
from app.schemas.stock import *  # noqa: F403
from app.schemas.supplier import *  # noqa: F403
from app.schemas.tender import *  # noqa: F403
from app.schemas.write_off import *  # noqa: F403
