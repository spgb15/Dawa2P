from dawaBack.dawa_back.src.api.Services.login_service import LoginService
from dawaBack.dawa_back.src.api.Services.user_service import UserService

def load_routes(api):
    #metodo para el login
    api.add_resource(LoginService, '/security/login')
    #metodo para listar los usuarios
    api.add_resource(UserService, '/user/list')


