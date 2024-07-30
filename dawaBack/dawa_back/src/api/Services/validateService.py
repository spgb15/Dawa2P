from flask import request
from flask_restful import Resource
from ..components.jwt_component import JwtComponent
from ...utils.general.logs import HandleLogs
from ...utils.general.response import response_error, response_success

class TokenValidationService(Resource):
    @staticmethod
    def post():
        try:
            HandleLogs.write_log("Ejecutando servicio de validación de token")

            # Obtener el JSON del cuerpo de la solicitud
            rq_json = request.get_json()

            # Verificar si el JSON contiene el campo 'token'
            if rq_json is None or 'token' not in rq_json:
                HandleLogs.write_error("Falta el token en la solicitud")
                return response_error("Falta el token en la solicitud")

            # Obtener el token
            token = rq_json['token']
            HandleLogs.write_log(f"Token recibido: {token}")

            # Validar el token usando JwtComponent
            is_valid = JwtComponent.TokenValidate(token)
            HandleLogs.write_log(f"Token válido: {is_valid}")

            if is_valid:
                return response_success("Token válido")
            else:
                return response_error("Token inválido")

        except Exception as err:
            HandleLogs.write_error(f"Error en el método: {str(err)}")
            return response_error("Error en el método: " + str(err))
