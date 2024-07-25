
def response_inserted(datos):
    return {
        'result': True,
        'message': "Registro Insertado con éxito",
        'data': datos,
        'status_code': 201,
    }, 201

def response_not_found():
    return {
        'result': False,
        'message': "No hay datos para la consulta",
        'data': {},
        'status_code': 404,
    }, 404

def response_success(message, data=None):
    return {
        'status': 'success',
        'message': message,
        'data': data
    }

def response_error(message):
    return {
        'status': 'error',
        'message': message
    }
def response_unauthorize():
    return {
        'result': False,
        'message': "Acceso No autorizado",
        'data': {},
        'status_code': 401,
    }, 401

def internal_response(result, data, message):
    return {
        'result': result,
        'data': data,
        'message': message
    }
