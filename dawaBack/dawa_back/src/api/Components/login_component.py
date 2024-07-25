from dawaBack.dawa_back.src.utils.database.connection_db import DataBaseHandle
from dawaBack.dawa_back.src.utils.general.logs import HandleLogs
from dawaBack.dawa_back.src.utils.general.response import internal_response

class LoginComponent:

    @staticmethod
    def Login(p_user, p_clave):
        try:
            result = False
            data = None
            message = None
            sql = "SELECT count(*) as valor FROM dawa.USUARIO WHERE USERNAME = %s AND CONTRASENIA = %s" # AND user_state = true
            record = (p_user, p_clave)
            resul_login = DataBaseHandle.getRecords(sql, 1, record)
            if resul_login['result']:
                if resul_login['data']['valor'] > 0:
                    result = True
                    message = 'Login Exitoso'
                else:
                    message = 'Login No Válido'
            else:
                message = resul_login['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)
        finally:
            return internal_response(result, data, message)