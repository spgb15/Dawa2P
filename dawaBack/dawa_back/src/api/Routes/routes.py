from src.api.Services.login_service import LoginService
from src.api.Services.user_service import UserService
from src.api.Services.profile_service import ProfileService
from src.api.Services.post_service import PostService
from src.api.Services.friend_service import FriendService
from src.api.Services.validateService import TokenValidationService
from src.api.Services.search_service import SearchService

def load_routes(api):
    # Método para el login
    api.add_resource(LoginService, '/security/login')

    # Método para validar el token
    api.add_resource(TokenValidationService, '/token')

    # Método para listar los usuarios
    api.add_resource(UserService, '/user/list')

    # Método para obtener el perfil del usuario
    api.add_resource(ProfileService, '/user/profile')

    # Método para manejar las publicaciones
    api.add_resource(PostService, '/api/posts')

    # Método para obtener amigos
    api.add_resource(FriendService, '/api/friends')

    api.add_resource(SearchService, '/search')

