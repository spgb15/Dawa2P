from src.utils.database.connection_db import DataBaseHandle
from src.utils.general.logs import HandleLogs
from src.api.Services.validateService import JwtComponent

class chatComponent():
    @staticmethod
    def get_chat(user_id):
        try:
            query = ""
        except Exception as err:
            HandleLogs.write_error(f"Error en get chats: {err}")
            return{
                'return': False,
                'data': None,
                'message': 'Error al obtener los chats'
            }
