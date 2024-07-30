# src/Services/search_service.py
from flask import request
from flask_restful import Resource
from ..Components.search_component import SearchComponent
from ...utils.general.logs import HandleLogs
from ...utils.general.response import response_error, response_success


class SearchService(Resource):
    @staticmethod
    def get():
        try:
            search_term = request.args.get('q', '').strip()
            HandleLogs.write_log(f"Buscando usuarios con término: {search_term}")

            if not search_term:
                return response_error("Término de búsqueda vacío")

            # Llamar al componente de búsqueda
            result = SearchComponent.search_users(search_term)

            # Ajustar el mensaje en función del resultado
            if result['result']:
                return response_success(result['message'], result['data'])
            else:
                return response_error(result['message'])
        except Exception as err:
            # Registrar el error y devolver una respuesta de error
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + str(err))
