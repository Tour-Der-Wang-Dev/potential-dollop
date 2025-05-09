from flask_login import LoginManager
from flask_bcrypt import Bcrypt

login_manager = LoginManager()
bcrypt = Bcrypt()

@login_manager.user_loader
def load_user(user_id):
    # Local import to avoid circular dependencies if User model imports extensions
    from src.models.user_models import User
    return User.query.get(int(user_id))

login_manager.login_view = "customer_bp.login"  # Default login view for @login_required
login_manager.login_message_category = "info" # Category for flashed login messages

