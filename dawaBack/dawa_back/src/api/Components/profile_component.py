# src/components/profile_component.py
from ...utils.database.connection_db import DataBaseHandle
from ...utils.general.logs import HandleLogs
from flask import request

class ProfileComponent:

    @staticmethod
    def get_profile():
        try:
            user_id = request.args.get('user_id')
            if not user_id:
                return {
                    'result': False,
                    'message': 'user_id no proporcionado'
                }

            sql = """
            SELECT d.NOMBRE, 
                   COALESCE(f.friend_count, 0) AS amigos, 
                   p.vive_en, 
                   p.de
            FROM dawa.USUARIO u
            JOIN dawa.DATOS d ON u.ID = d.ID
            LEFT JOIN (
                SELECT USER_ID1 AS user_id, COUNT(*) AS friend_count
                FROM dawa.FRIENDS
                WHERE USER_ID1 = %s OR USER_ID2 = %s
                GROUP BY USER_ID1
            ) f ON u.ID = f.user_id
            LEFT JOIN dawa.PERFIL p ON u.ID = p.user_id
            WHERE u.ID = %s
            """
            record = (user_id, user_id, user_id)
            resul_profile = DataBaseHandle.getRecords(sql, 1, record)

            if resul_profile['result']:
                if resul_profile['data']:
                    profile_data = resul_profile['data']
                    return {
                        'result': True,
                        'data': {
                            'nombre': profile_data['nombre'],
                            'amigos': profile_data['amigos'],
                            'coverPhoto': '/path/to/default-cover-photo.jpg',
                            'profilePhoto': '/path/to/default-profile-photo.jpg',
                            'location': profile_data['vive_en'] or 'Ubicación desconocida',
                            'hometown': profile_data['de'] or 'Lugar de origen desconocido',
                        },
                        'message': 'Perfil encontrado'
                    }
                else:
                    return {
                        'result': False,
                        'message': 'Perfil no encontrado'
                    }
            else:
                return {
                    'result': False,
                    'message': resul_profile['message']
                }
        except Exception as err:
            HandleLogs.write_error(err)
            return {
                'result': False,
                'message': str(err)
            }
