import os

from flask import Flask
from .routes.customers import customers_bp
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from .utils.db import db, uri_db
import pymysql
from flask_cors import CORS
def create_app():
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.register_blueprint(customers_bp)

    app.config['SQLALCHEMY_DATABASE_URI'] = uri_db
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    CORS(app)
    SQLAlchemy(app)
    Marshmallow(app)
    pymysql.install_as_MySQLdb()
    with app.app_context():
        db.create_all()
    return app