from ..utils.db import db, ma

class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    surnames = db.Column(db.String(100))
    phone = db.Column(db.String(10))
    email = db.Column(db.String(100))
    age = db.Column(db.Integer)
    state = db.Column(db.String(10))
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    def __init__(self, name, surnames, phone, email, age, state, created_at, updated_at):
        self.name = name
        self.surnames = surnames
        self.phone = phone
        self.email = email
        self.age = age
        self.state = state
        self.created_at = created_at
        self.updated_at = updated_at

class CustomerSchema(ma.Schema):
    class Meta: 
        fields = ('id', 'name', 'surnames', 'phone', 'email', 'age', 'state', 'created_at')

customer_schema = CustomerSchema()
customers_schema = CustomerSchema(many=True)