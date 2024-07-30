from dawaBack.dawa_back.src.utils.database.connection_db import DataBaseHandle
from dawaBack.dawa_back.src.utils.general.logs import HandleLogs
from datetime import datetime


class PostComponent:

    @staticmethod
    def get_posts_by_user(user_id):
        try:
            sql = "SELECT * FROM dawa.POST WHERE USER_ID = %s"
            result = DataBaseHandle.getRecords(sql, 1, (user_id,))

            if result['result']:
                # Convertir las fechas a cadenas
                for post in result['data']:
                    post['FECHA_CREADO'] = post['FECHA_CREADO'].isoformat()
                    post['FECHA_UPDATE'] = post['FECHA_UPDATE'].isoformat()

                return {
                    'result': True,
                    'data': result['data']
                }
            else:
                return {
                    'result': False,
                    'message': result['message']
                }
        except Exception as err:
            HandleLogs.write_error(err)
            return {
                'result': False,
                'message': str(err)
            }

    @staticmethod
    def create_post(user_id, content):
        try:
            sql = """
            INSERT INTO dawa.POST (USER_ID, CONTENIDO, FECHA_CREADO) 
            VALUES (%s, %s, NOW())
            """
            result = DataBaseHandle.execute(sql, (user_id, content))

            if result:
                return {
                    'result': True,
                    'message': 'Post creado exitosamente'
                }
            else:
                return {
                    'result': False,
                    'message': 'No se pudo crear el post'
                }
        except Exception as err:
            HandleLogs.write_error(err)
            return {
                'result': False,
                'message': str(err)
            }
