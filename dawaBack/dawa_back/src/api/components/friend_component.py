from src.utils.database.connection_db import DataBaseHandle
from src.utils.general.logs import HandleLogs
from src.api.Services.validateService import JwtComponent

class FriendComponent:
    @staticmethod
    def get_friends(user_id, token):
        try:
            # Valida el token usando JwtComponent
            token_validation = JwtComponent.TokenValidate(token)
            if token_validation['status'] == 'error':
                return {
                    'result': False,
                    'data': None,
                    'message': token_validation['message']
                }

            # Consulta SQL para obtener la lista de amigos del usuario
            sql_friends = """
            SELECT 
                CASE
                    WHEN f.user_id1 = %s THEN d2.nombre
                    ELSE d1.nombre
                END AS nombre,
                CASE
                    WHEN f.user_id1 = %s THEN d2.id
                    ELSE d1.id
                END AS amigo_id
            FROM dawa.FRIENDS f
            JOIN dawa.DATOS d1 ON f.user_id1 = d1.id
            JOIN dawa.DATOS d2 ON f.user_id2 = d2.id
            WHERE f.user_id1 = %s OR f.user_id2 = %s
            """
            record_friends = (user_id, user_id, user_id, user_id)
            result = DataBaseHandle.getRecords(sql_friends, 1, record_friends)

            if result['result']:
                return {
                    'result': True,
                    'data': result['data'],
                    'message': 'Amigos obtenidos con éxito'
                }
            else:
                return {
                    'result': False,
                    'data': None,
                    'message': 'No se encontraron amigos'
                }
        except Exception as err:
            HandleLogs.write_error(f"Error en get_friends: {err}")
            return {
                'result': False,
                'data': None,
                'message': 'Error al obtener amigos'
            }
