from src.utils.general.config import Parametros
from src.utils.general.logs import HandleLogs
from datetime import datetime, timedelta
import pytz
import jwt

class JwtComponent:
    @staticmethod
    def TokenGenerate(p_user, p_pass, user_id):
        try:
            timezone = pytz.timezone('America/Guayaquil')
            payload = {
                'iat': datetime.now(tz=timezone),
                'exp': datetime.now(tz=timezone) + timedelta(seconds=3600),
                'username': p_user,
                'pass': p_pass,
                'user_id': user_id
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
            payload = jwt.decode(token, Parametros.jwt_pass, algorithms=['HS256'])
            return {
                'status': 'success',
                'data': payload
            }
        except jwt.ExpiredSignatureError:
            HandleLogs.write_log("Token expirado")
            return {
                'status': 'error',
                'message': 'Token expirado'
            }
        except jwt.InvalidTokenError:
            HandleLogs.write_log("Token inválido")
            return {
                'status': 'error',
                'message': 'Token inválido'
            }
        except Exception as err:
            HandleLogs.write_log("Error al validar el token")
            HandleLogs.write_error(str(err))
            return {
                'status': 'error',
                'message': str(err)
            }
