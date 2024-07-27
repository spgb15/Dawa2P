import jwt
import datetime
from dawaBack.dawa_back.src.utils.database.connection_db import DataBaseHandle
from dawaBack.dawa_back.src.utils.general.logs import HandleLogs
from dawaBack.dawa_back.src.utils.general.response import internal_response


class LoginComponent:

    @staticmethod
    def login(p_user, p_clave):
        try:
            result = False
            data = None
            message = None

            # Definir la clave secreta para JWT
            SECRET_KEY = 'mi_clave_secreta'  # Cambia esto por una clave secreta y segura

            # Consulta SQL para obtener los datos del usuario
            sql = """
            SELECT u.id as usuario_id, d.cedula, d.nombre, r.descripcion as rol 
            FROM dawa.USUARIO u 
            JOIN dawa.DATOS d ON u.id = d.id 
            JOIN dawa.ROL r ON d.rol = r.id 
            WHERE u.username = %s AND u.contrasenia = %s
            """
            record = (p_user, p_clave)
            resul_login = DataBaseHandle.getRecords(sql, 1, record)

            if resul_login['result']:
                if resul_login['data']:
                    user_data = resul_login['data']

                    # Generar el token JWT
                    token = jwt.encode({
                        'usuario_id': user_data['usuario_id'],
                        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
                    }, SECRET_KEY, algorithm='HS256')

                    data = {
                        'usuario_id': user_data['usuario_id'],
                        'cedula': user_data['cedula'],
                        'nombre': user_data['nombre'],
                        'rol': user_data['rol'],
                        'token': token
                    }
                    result = True
                    message = 'Login Exitoso'
                else:
                    message = 'Credenciales incorrectas'
            else:
                message = resul_login['message']
        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)
        finally:
            return {
                'result': result,
                'data': data,
                'message': message
            }
