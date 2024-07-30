from flask import request
from flask_restful import Resource
from ..Components.post_component import PostComponent
from ...utils.general.logs import HandleLogs
from ...utils.general.response import response_error, response_success
from datetime import datetime
import json


class PostService(Resource):

    @staticmethod
    def get():
        try:
            HandleLogs.write_log("Ejecutando servicio de obtener posts")
            user_id = request.args.get('user_id')

            if not user_id:
                return response_error("El ID de usuario es requerido")

            resultado = PostComponent.get_posts_by_user(user_id)

            HandleLogs.write_log(f"Tipo de resultado: {type(resultado)}")
            HandleLogs.write_log(f"Contenido de resultado: {resultado}")

            if isinstance(resultado, str):
                try:
                    resultado = json.loads(resultado)
                except json.JSONDecodeError:
                    return response_error("Error al decodificar la respuesta")

            if isinstance(resultado, dict):
                if resultado.get('result'):
                    for post in resultado.get('data', []):
                        if isinstance(post, dict):
                            if 'FECHA_CREADO' in post and isinstance(post['FECHA_CREADO'], str):
                                try:
                                    post['FECHA_CREADO'] = datetime.fromisoformat(post['FECHA_CREADO']).isoformat()
                                except ValueError:
                                    pass
                            if 'FECHA_UPDATE' in post and isinstance(post['FECHA_UPDATE'], str):
                                try:
                                    post['FECHA_UPDATE'] = datetime.fromisoformat(post['FECHA_UPDATE']).isoformat()
                                except ValueError:
                                    pass

                    return response_success("Posts obtenidos exitosamente", resultado.get('data', []))
                else:
                    return response_error(resultado.get('message', "Error desconocido"))
            else:
                return response_error("Formato de respuesta inválido")

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + str(err))

    @staticmethod
    def post():
        try:
            HandleLogs.write_log("Ejecutando servicio de crear post")
            rq_json = request.get_json()

            if not rq_json or 'user_id' not in rq_json or 'content' not in rq_json:
                return response_error("El contenido del post y el ID de usuario son requeridos")

            user_id = rq_json['user_id']
            content = rq_json['content']

            resultado = PostComponent.create_post(user_id, content)

            # Depuración: Imprimir tipo y contenido de resultado
            HandleLogs.write_log(f"Tipo de resultado: {type(resultado)}")
            HandleLogs.write_log(f"Contenido de resultado: {resultado}")

            if isinstance(resultado, str):
                resultado = json.loads(resultado)

            if isinstance(resultado, dict):
                if resultado.get('result'):
                    return response_success(resultado.get('message', "Post creado exitosamente"))
                else:
                    return response_error(resultado.get('message', "Error al crear el post"))
            else:
                return response_error("Formato de respuesta inválido")

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + str(err))
