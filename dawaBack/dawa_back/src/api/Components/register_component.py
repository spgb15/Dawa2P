from src.utils.database.connection_db import DataBaseHandle
from src.utils.general.logs import HandleLogs
from src.api.Services.validateService import JwtComponent


class RegisterComponent:
    @staticmethod
    def validador(cedula):
        if not cedula.isdigit() or len(cedula) != 10:
            return False

        # Primer dígito (región) no puede ser mayor a 6
        if int(cedula[0]) not in range(1, 7):
            return False

        # Obtener los primeros 9 dígitos
        numeros = [int(d) for d in cedula[:9]]
        digito_verificador = int(cedula[9])

        # Multiplicadores según el algoritmo
        multiplicadores = [2, 1, 2, 1, 2, 1, 2, 1, 2]

        suma = 0
        for i in range(9):
            producto = numeros[i] * multiplicadores[i]
            if producto > 9:
                producto -= 9
            suma += producto

        # Calcular el dígito verificador esperado
        digito_calculado = (10 - (suma % 10)) % 10

        return digito_calculado == digito_verificador
    @staticmethod
    def register(cedula):
        try:
            if not RegisterComponent.validador(cedula):
                return {
                    "status": "error",
                    "message": "Cedula invalida, ingrese una correctamente"
                }

            sql = "Select * from dawa.datos where cedula = %s"
            sql_record = (cedula)
            result = DataBaseHandle.getRecords(sql, 1, sql_record)

            if result['result']:
                return {
                    'result' : True,
                    'data': result['data'],
                    'message': "Registros encontrados"
                }
            else:
                return{
                    'result': False,
                    'data': None,
                    'message': 'No se encontraron registros'
                }
        except Exception as err:
            HandleLogs.write_error(f"Error en el metodo getCedula: {err}")
            return {
                'result': False,
                'data': None,
                'message': 'Error al obtener amigos'
            }
    @staticmethod
    def registrado(id, p_user, p_pass):
        try:
            sql = "INSERT INTO dawa.usuarios (username, contrasenia) values (%s,%s) where id = %s"
            register_record = (p_user, p_pass, id)
            result = DataBaseHandle.ExecuteNonQuery(sql, register_record)

            if result['result']:
                return{
                    "result": True,
                    "data": result['data']
                }
        except Exception as err:
            HandleLogs.write_error(err)
            return{
                "result": False,
                "data": None,
                "message": f"Error al guardar los registros: {err}"
            }
