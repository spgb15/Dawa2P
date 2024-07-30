from dawaBack.dawa_back.src.api.Services.login_service import LoginService
from dawaBack.dawa_back.src.api.Services.user_service import UserService
from dawaBack.dawa_back.src.api.Services.profile_service import ProfileService

def load_routes(api):
    #metodo para el login
    api.add_resource(LoginService, '/security/login')
    #metodo para listar los usuarios
    api.add_resource(UserService, '/user/list')
    api.add_resource(ProfileService, '/user/profile')


