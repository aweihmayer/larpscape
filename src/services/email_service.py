# Module imports
from .dependencies import *

class EmailService(BaseService):
    def send_confirmation(self, user: User):
        pass

    def _send(self, to: str, subject: str, body: str):
        try:
            provider = EmailProvider(self.configs.email_provider)
            if provider == EmailProvider.RESEND:
                api_key = self.configs.resend_api_key
                assert api_key
                pass # TODO
            else:
                raise InternalServerErrorException()
        except:
            raise InternalServerErrorException()