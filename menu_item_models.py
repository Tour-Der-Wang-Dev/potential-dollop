# Menu item model
from . import db  # Assuming db is initialized in __init__.py or similar

class MenuItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200))
    price = db.Column(db.Float, nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)
    restaurant = db.relationship('Restaurant', backref=db.backref('menu_items', lazy=True))

    def __repr__(self):
        return f'<MenuItem {self.name}>'
