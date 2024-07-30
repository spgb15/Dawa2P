from flask import request
from flask_restful import Resource
from src.api.components.friend_component import FriendComponent
from src.utils.general.logs import HandleLogs
from src.utils.general.response import response_error, response_success
from src.api.Services.validateService import JwtComponent

class FriendService(Resource):
    @staticmethod
    def post():
        try:
            HandleLogs.write_log("Ejecutando servicio para obtener amigos")

            # Obtener el token del request
            request_data = request.get_json()
            if not request_data or 'tokens' not in request_data:
                return response_error("Token de autenticación no proporcionado")

            token = request_data['tokens']

            # Validar el token usando JwtComponent
            token_validation = JwtComponent.TokenValidate(token)
            if token_validation['status'] == 'error':
                return response_error(token_validation['message'])

            # Obtener el user_id del token
            user_id = token_validation.get('data', {}).get('user_id')
            if not user_id:
                return response_error('ID de usuario no encontrado en el token')

            # Llamar al método estático get_friends de FriendComponent
            resultado = FriendComponent.get_friends(user_id, token)
            if resultado['result']:
                return response_success(resultado['message'], resultado['data'])
            else:
                return response_error(resultado['message'])

        except Exception as err:
            HandleLogs.write_error(f"Error en el método: {err}")
            return response_error("Error en el método: " + str(err))
