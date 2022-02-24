from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
db = SQLAlchemy()
ma = Marshmallow()

user_db = 'customersApi'
password_db = '$1A2b3c4d'
server_db = 'customersApi.mysql.pythonanywhere-services.com'
name_db = 'customersApi$customers_api'

uri_db = 'mysql://' + user_db + ':' + password_db + '@' + server_db + '/' + name_db