# Updated user model to support multiple addresses and default address
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)  # In a real app, this should be hashed
    role = db.Column(db.String(80), nullable=False)  # customer, restaurant_owner, admin
    # Relationship to Address model
    addresses = db.relationship('Address', backref='user', lazy='dynamic')

    def __repr__(self):
        return f'<User {self.username}>'

class Address(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    description = db.Column(db.String(100), nullable=False)  # e.g., "Home", "Work", "Mom's House"
    street = db.Column(db.String(200), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100), nullable=False)
    zip_code = db.Column(db.String(20), nullable=False)
    is_default = db.Column(db.Boolean, default=False, nullable=False)

    def __repr__(self):
        return f'<Address {self.description} for User {self.user_id}>'
