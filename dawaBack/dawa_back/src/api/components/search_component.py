# src/Components/search_component.py
from dawaBack.dawa_back.src.utils.database.connection_db import DataBaseHandle
from dawaBack.dawa_back.src.utils.general.logs import HandleLogs

class SearchComponent:

    @staticmethod
    def search_users(search_term):
        try:
            sql = """
            SELECT u.id, d.nombre, u.username
            FROM dawa.USUARIO u
            JOIN dawa.DATOS d ON u.id = d.id
            WHERE d.nombre ILIKE %s
            """
            record = ('%' + search_term + '%',)
            HandleLogs.write_log(f"Ejecutando consulta SQL: {sql} con parámetros: {record}")
            result = DataBaseHandle.getRecords(sql, 1, record)
            HandleLogs.write_log(f"Resultado de la consulta: {result}")

            if result['result']:
                return {'result': True, 'data': result['data'], 'message': 'Usuarios encontrados'}
            else:
                return {'result': False, 'data': [], 'message': 'No se encontraron usuarios'}
        except Exception as err:
            HandleLogs.write_error(err)
            return {'result': False, 'data': [], 'message': str(err)}
