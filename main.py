# Initialize Flask app and database
import sys
import os

# This line is crucial for the deployment environment to find the modules in the src directory.
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask
from src.extensions import db, login_manager, bcrypt

# Import Blueprints
from src.routes.customer_routes import customer_bp
from src.routes.restaurant_routes import restaurant_bp
from src.routes.admin_routes import admin_bp

def create_app(config_name=None):
    app = Flask(__name__, template_folder="templates", static_folder="static")

    # Load configuration
    app.config["SQLALCHEMY_DATABASE_URI"] = f"mysql+pymysql://{os.getenv("DB_USERNAME", "root")}:{os.getenv("DB_PASSWORD", "password")}@{os.getenv("DB_HOST", "localhost")}:{os.getenv("DB_PORT", "3306")}/{os.getenv("DB_NAME", "food_delivery_db")}"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "a_very_secret_key_for_dev_only_change_it_!!!")

    # Initialize extensions with the app instance
    db.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)

    # Register Blueprints
    app.register_blueprint(customer_bp, url_prefix="/customer")
    app.register_blueprint(restaurant_bp, url_prefix="/restaurant")
    app.register_blueprint(admin_bp, url_prefix="/admin")

    @app.route("/")
    def index():
        return "Welcome to the Food Delivery App! Base route."

    return app

if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        db.create_all()
    app.run(debug=True, host="0.0.0.0", port=5000)

