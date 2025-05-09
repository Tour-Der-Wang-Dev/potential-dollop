# Customer routes
from flask import Blueprint, render_template, request, redirect, url_for, flash, session
from src.models.user_models import User, Address, db # Assuming db is initialized in user_models.py
from flask_bcrypt import Bcrypt
from flask_login import login_user, logout_user, login_required, current_user

# Initialize Bcrypt. This should ideally be done in main.py or app factory
# For now, let's assume it can be initialized here or passed in.
# If main.py initializes it as app.bcrypt, we might need to import app or pass bcrypt instance.
# For simplicity, let's initialize it here for now, but this is not best practice for larger apps.
bcrypt = Bcrypt()

customer_bp = Blueprint(
    "customer_bp", __name__,
    template_folder="../templates/customer",
    static_folder="../static"
)

# This function would typically be in main.py or an auth.py and registered with LoginManager
# For now, it is here for simplicity.
# from main import login_manager # Assuming login_manager is initialized in main.py
# @login_manager.user_loader
# def load_user(user_id):
#     return User.query.get(int(user_id))

@customer_bp.route("/")
@login_required
def customer_home():
    return render_template("customer_home.html", title="Customer Dashboard")

@customer_bp.route("/register", methods=["GET", "POST"])
def register():
    if current_user.is_authenticated:
        return redirect(url_for("customer_bp.customer_home"))
    if request.method == "POST":
        username = request.form.get("username")
        email = request.form.get("email")
        password = request.form.get("password")
        confirm_password = request.form.get("confirm_password")

        if password != confirm_password:
            flash("Passwords do not match.", "danger")
            return redirect(url_for("customer_bp.register"))

        existing_user_email = User.query.filter_by(email=email).first()
        if existing_user_email:
            flash("Email address already registered.", "warning")
            return redirect(url_for("customer_bp.register"))
        
        existing_user_username = User.query.filter_by(username=username).first()
        if existing_user_username:
            flash("Username already taken.", "warning")
            return redirect(url_for("customer_bp.register"))

        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
        new_user = User(username=username, email=email, password=hashed_password, role="customer")
        db.session.add(new_user)
        db.session.commit()
        flash("Registration successful! Please login.", "success")
        return redirect(url_for("customer_bp.login"))
    return render_template("customer_register.html", title="Register")

@customer_bp.route("/login", methods=["GET", "POST"])
def login():
    if current_user.is_authenticated:
        return redirect(url_for("customer_bp.customer_home"))
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")
        user = User.query.filter_by(email=email).first()
        if user and bcrypt.check_password_hash(user.password, password):
            login_user(user) # Manages user session
            flash("Login successful!", "success")
            next_page = request.args.get("next")
            return redirect(next_page or url_for("customer_bp.customer_home"))
        else:
            flash("Login unsuccessful. Please check email and password.", "danger")
    return render_template("customer_login.html", title="Login")

@customer_bp.route("/logout")
@login_required
def logout():
    logout_user()
    flash("You have been logged out.", "info")
    return redirect(url_for("customer_bp.login"))

@customer_bp.route("/profile")
@login_required
def view_profile():
    return render_template("customer_profile.html", title="My Profile", user=current_user)

@customer_bp.route("/profile/edit", methods=["GET", "POST"])
@login_required
def edit_profile():
    if request.method == "POST":
        # Logic to update username, email, password
        current_user.username = request.form.get("username", current_user.username)
        current_user.email = request.form.get("email", current_user.email)
        
        current_password = request.form.get("current_password")
        new_password = request.form.get("new_password")
        confirm_new_password = request.form.get("confirm_new_password")

        if new_password:
            if not current_password or not bcrypt.check_password_hash(current_user.password, current_password):
                flash("Current password incorrect or not provided.", "danger")
            elif new_password != confirm_new_password:
                flash("New passwords do not match.", "danger")
            else:
                current_user.password = bcrypt.generate_password_hash(new_password).decode("utf-8")
                flash("Password updated successfully.", "success")
        
        db.session.commit()
        flash("Profile updated successfully!", "success")
        return redirect(url_for("customer_bp.view_profile"))
    return render_template("edit_profile.html", title="Edit Profile", user=current_user)


@customer_bp.route("/addresses")
@login_required
def view_addresses():
    addresses = Address.query.filter_by(user_id=current_user.id).all()
    return render_template("addresses.html", title="My Addresses", addresses=addresses)

@customer_bp.route("/addresses/add", methods=["GET", "POST"])
@login_required
def add_address():
    if request.method == "POST":
        description = request.form.get("description")
        street = request.form.get("street")
        city = request.form.get("city")
        state = request.form.get("state")
        zip_code = request.form.get("zip_code")
        is_default = request.form.get("is_default") == "true"

        if is_default:
            # Set other addresses for this user to not be default
            Address.query.filter_by(user_id=current_user.id, is_default=True).update({"is_default": False})

        new_address = Address(user_id=current_user.id, description=description, 
                              street=street, city=city, state=state, zip_code=zip_code, is_default=is_default)
        db.session.add(new_address)
        db.session.commit()
        flash("Address added successfully!", "success")
        next_url = request.args.get("next")
        return redirect(next_url or url_for("customer_bp.view_addresses"))
    return render_template("add_address.html", title="Add New Address")

@customer_bp.route("/addresses/edit/<int:address_id>", methods=["GET", "POST"])
@login_required
def edit_address(address_id):
    address = Address.query.filter_by(id=address_id, user_id=current_user.id).first_or_404()
    if request.method == "POST":
        address.description = request.form.get("description")
        address.street = request.form.get("street")
        address.city = request.form.get("city")
        address.state = request.form.get("state")
        address.zip_code = request.form.get("zip_code")
        is_default = request.form.get("is_default") == "true"

        if is_default and not address.is_default:
            Address.query.filter_by(user_id=current_user.id, is_default=True).update({"is_default": False})
            address.is_default = True
        elif not is_default and address.is_default:
            # Prevent unsetting the only default address if it is the only address
            # Or handle logic to ensure one address is always default if required
            address.is_default = False 
            # Add logic here if a default address is mandatory and this was the last one.

        db.session.commit()
        flash("Address updated successfully!", "success")
        return redirect(url_for("customer_bp.view_addresses"))
    return render_template("edit_address.html", title="Edit Address", address=address)

@customer_bp.route("/addresses/delete/<int:address_id>", methods=["POST"])
@login_required
def delete_address(address_id):
    address = Address.query.filter_by(id=address_id, user_id=current_user.id).first_or_404()
    if address.is_default:
        flash("Cannot delete default address. Set another address as default first.", "danger")
    else:
        db.session.delete(address)
        db.session.commit()
        flash("Address deleted successfully!", "success")
    return redirect(url_for("customer_bp.view_addresses"))

@customer_bp.route("/addresses/set_default/<int:address_id>", methods=["POST"])
@login_required
def set_default_address(address_id):
    address_to_set_default = Address.query.filter_by(id=address_id, user_id=current_user.id).first_or_404()
    Address.query.filter_by(user_id=current_user.id, is_default=True).update({"is_default": False})
    address_to_set_default.is_default = True
    db.session.commit()
    flash(f"{address_to_set_default.description} set as default address.", "success")
    return redirect(url_for("customer_bp.view_addresses"))


# Placeholder for other routes - to be implemented
@customer_bp.route("/restaurants")
@login_required
def list_restaurants():
    # restaurants = Restaurant.query.all()
    return render_template("list_restaurants.html", title="Browse Restaurants") #, restaurants=restaurants)

@customer_bp.route("/restaurants/<int:restaurant_id>")
@login_required
def view_restaurant_menu(restaurant_id):
    # restaurant = Restaurant.query.get_or_404(restaurant_id)
    # menu_items = MenuItem.query.filter_by(restaurant_id=restaurant_id).all()
    return render_template("restaurant_menu.html", title="Restaurant Menu") #, restaurant=restaurant, menu_items=menu_items)

@customer_bp.route("/cart", methods=["GET", "POST"])
@login_required
def view_cart():
    # Logic for cart in session
    return render_template("cart.html", title="Shopping Cart")

@customer_bp.route("/checkout", methods=["GET", "POST"])
@login_required
def checkout():
    addresses = Address.query.filter_by(user_id=current_user.id).all()
    if request.method == "POST":
        # Process order
        pass
    return render_template("checkout.html", title="Checkout", addresses=addresses)

@customer_bp.route("/orders")
@login_required
def list_orders():
    # orders = Order.query.filter_by(user_id=current_user.id).order_by(Order.created_at.desc()).all()
    return render_template("list_orders.html", title="My Orders") #, orders=orders)

@customer_bp.route("/orders/<int:order_id>")
@login_required
def view_order_details(order_id):
    # order = Order.query.get_or_404(order_id)
    return render_template("order_details.html", title="Order Details") #, order=order)

