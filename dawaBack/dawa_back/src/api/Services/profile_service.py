from flask import request
from flask_restful import Resource
from ..Components.profile_component import ProfileComponent
from ...utils.general.logs import HandleLogs
from ...utils.general.response import response_error, response_success

class ProfileService(Resource):
    @staticmethod
    def get():
        try:
            HandleLogs.write_log("Ejecutando servicio de Profile")

            # Obtener el ID del usuario desde los parámetros de la consulta
            user_id = request.args.get('user_id')

            # Validar la existencia del ID del usuario
            if not user_id:
                HandleLogs.write_error("User ID es requerido")
                return response_error("User ID es requerido")

            # Llamar al componente de perfil para obtener los datos
            resultado = ProfileComponent.get_profile(user_id)

            # Retornar la respuesta basada en el resultado obtenido
            if resultado['result']:
                return response_success(resultado['message'], resultado['data'])
            else:
                return response_error(resultado['message'])

        except Exception as err:
            HandleLogs.write_error(f"Error en el método get de ProfileService: {err}")
            return response_error(f"Error en el método: {err}")
