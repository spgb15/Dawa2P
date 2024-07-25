import os
from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from flask_swagger_ui import get_swaggerui_blueprint
from src.utils.general.logs import HandleLogs
from src.api.routes.route import load_routes

app = Flask(__name__)
CORS(app)
api = Api(app)
load_routes(api)

SWAGGER_URL = '/practica/login'
APP_URL = '/static/swagger.json'

SWAGGERUI_BLUEPRINT = get_swaggerui_blueprint(SWAGGER_URL, APP_URL,
                                              config={
                                                  'app_name': 'practica'
                                              })

app.register_blueprint(SWAGGERUI_BLUEPRINT, url_prefix=SWAGGER_URL)




if __name__ == '__main__':
    try:
        HandleLogs.write_log("Servicio Iniciado")
        port = int(os.environ.get('PORT', 1011))
        app.run(debug=True, port=port, host='0.0.0.0', threaded = True)

    except Exception as ex:
        HandleLogs.write_error(ex)
    finally:
        HandleLogs.write_log("Servicio Finalizado")