class BaseHttpException(Exception):
    def __init__(self,
        code: int,
        content: dict = {}
    ):
        self.code = code
        self.content = content