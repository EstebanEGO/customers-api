from flask import (Blueprint, flash, request, jsonify)
from ..models.customer import Customer, customer_schema, customers_schema
from ..utils.db import db
from datetime import datetime
customers_bp = Blueprint('customers', __name__)

@customers_bp.route("/api/custumers", methods = ['GET'])
def index():
    customers = Customer.query.all()
    result = customers_schema.dump(customers)
    return jsonify(result)

@customers_bp.route("/api/custumers", methods = ['POST'])
def store():
    form = request.get_json()
    name = form['name']
    surnames = form['surnames']
    phone = form['phone']
    email = form['email']
    age = form['age']
    state = form['state']
    created_at = datetime.now()
    updated_at = datetime.now()
    new_customer = Customer(name, surnames, phone, email, age, state, created_at, updated_at)
    db.session.add(new_customer)
    db.session.commit()

    return customer_schema.jsonify(new_customer)

@customers_bp.route("/api/custumers/<int:id>", methods = ['GET'])
def edit(id):
    customer = Customer.query.get(id)
    return customer_schema.jsonify(customer)

@customers_bp.route("/api/custumers/<int:id>", methods = ['PUT'])
def update(id):
    customer = Customer.query.get(id)
    form = request.get_json()
    customer.name = form['name']
    customer.surnames = form['surnames']
    customer.phone = form['phone']
    customer.email = form['email']
    customer.age = form['age']
    customer.state = form['state']
    customer.updated_at = datetime.now()
    
    db.session.commit()
    return customer_schema.jsonify(customer)

@customers_bp.route("/api/custumers/<int:id>", methods = ['DELETE'])
def destroy(id):
    customer = Customer.query.get(id)
    db.session.delete(customer)
    db.session.commit()
    return customer_schema.jsonify(customer)