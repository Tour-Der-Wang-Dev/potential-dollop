# Order model
from . import db  # Assuming db is initialized in __init__.py or similar

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), nullable=False, default='Pending') # e.g., Pending, Confirmed, Preparing, Out for Delivery, Delivered, Cancelled
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    user = db.relationship('User', backref=db.backref('orders', lazy=True))
    restaurant = db.relationship('Restaurant', backref=db.backref('orders', lazy=True))
    # Relationship to OrderItem model (one-to-many: one order can have many items)
    items = db.relationship('OrderItem', backref='order', lazy='dynamic')

    def __repr__(self):
        return f'<Order {self.id}>'

class OrderItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
    menu_item_id = db.Column(db.Integer, db.ForeignKey('menu_item.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price_at_order = db.Column(db.Float, nullable=False) # Price of the item at the time of order

    menu_item = db.relationship('MenuItem', backref=db.backref('order_items', lazy=True))

    def __repr__(self):
        return f'<OrderItem {self.id} for Order {self.order_id}>'
