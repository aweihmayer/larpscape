# Native imports
from typing import Any
# Package imports
from src.constants import *
from src.http import *

class DtoField:
    def __init__(self,
        dimension: Dimension | None = None,
        role: Role | None = None
    ):
        self.dimension = dimension
        self.role = role

    def is_included(self, context: RequestContext) -> bool:
        if self.role and not context.user.has_permissions(self.role):
            return False
        elif self.dimension and context.dimensions and not self.dimension in context.dimensions:
            return False
        else:
            return True