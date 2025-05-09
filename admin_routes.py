# Admin routes
from flask import Blueprint, render_template, request, redirect, url_for, flash
# from ..models import User, Restaurant, Order # Assuming models are in the main models directory
# from .. import db # Assuming db is initialized in the main __init__.py

admin_bp = Blueprint("admin_bp", __name__,
                     template_folder="../templates/admin",
                     url_prefix="/admin")

# A decorator to protect admin routes (example, replace with actual auth)
from functools import wraps
def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Replace with actual authentication and authorization check
        # For example, check if current_user.is_admin or similar
        # if not current_user.is_authenticated or current_user.role != "admin":
        #     flash("You do not have permission to access this page.", "danger")
        #     return redirect(url_for("customer_bp.login")) # Or a generic login page
        return f(*args, **kwargs)
    return decorated_function

@admin_bp.route("/")
@admin_required
def admin_dashboard():
    # Logic for the admin dashboard (e.g., overview of users, restaurants, orders)
    return render_template("admin_dashboard.html", title="Admin Dashboard")

@admin_bp.route("/users")
@admin_required
def manage_users():
    # Logic to list and manage users (customers, restaurant owners)
    # users = User.query.all()
    return render_template("manage_users.html", title="Manage Users") #, users=users)

@admin_bp.route("/users/edit/<int:user_id>", methods=["GET", "POST"])
@admin_required
def edit_user(user_id):
    # Logic to edit a user's details or role
    # user = User.query.get_or_404(user_id)
    # if request.method == "POST":
    #     # Process form data and update user
    #     flash(f"User {user.username} updated successfully!", "success")
    #     return redirect(url_for("admin_bp.manage_users"))
    return render_template("edit_user.html", title="Edit User") #, user=user)

@admin_bp.route("/restaurants")
@admin_required
def manage_restaurants():
    # Logic to list and manage restaurants
    # restaurants = Restaurant.query.all()
    return render_template("manage_restaurants.html", title="Manage Restaurants") #, restaurants=restaurants)

@admin_bp.route("/restaurants/edit/<int:restaurant_id>", methods=["GET", "POST"])
@admin_required
def edit_restaurant(restaurant_id):
    # Logic to edit restaurant details
    # restaurant = Restaurant.query.get_or_404(restaurant_id)
    # if request.method == "POST":
    #     # Process form data and update restaurant
    #     flash(f"Restaurant {restaurant.name} updated successfully!", "success")
    #     return redirect(url_for("admin_bp.manage_restaurants"))
    return render_template("edit_restaurant.html", title="Edit Restaurant") #, restaurant=restaurant)

@admin_bp.route("/orders")
@admin_required
def view_all_orders():
    # Logic to view all orders in the system
    # orders = Order.query.all()
    return render_template("view_all_orders.html", title="All Orders") #, orders=orders)

# Add more admin routes as needed, e.g., for system settings, reports, etc.

