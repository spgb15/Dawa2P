from ...utils.general.config import Parametros
from ...utils.general.logs import HandleLogs
from datetime import datetime, timedelta
import pytz
import jwt

class JwtComponent:
    @staticmethod
    def TokenGenerate(p_user, p_pass):
        try:
            timezone = pytz.timezone('America/Guayaquil')
            payload = {
                'iat': datetime.now(tz=timezone),
                'exp': datetime.now(tz=timezone) + timedelta(seconds=3600),
                'username': p_user,
                'pass': p_pass
            }
            respuesta = jwt.encode(payload, Parametros.jwt_pass, 'HS256')
            return respuesta
        except Exception as err:
            HandleLogs.write_log("Error al generar el token")
            HandleLogs.write_error(str(err))
            return None

    @staticmethod
    def TokenValidate(token):
        try:
            resp_jtw = jwt.decode(token, Parametros.jwt_pass, algorithms=['HS256'])
            print(resp_jtw)
            return True if resp_jtw is not None else False
        except Exception as err:
            HandleLogs.write_log("Error al validar el token")
            HandleLogs.write_error(str(err))
            return False
