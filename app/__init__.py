from flask import Flask

# main flask object
app = Flask(__name__)

# import views after app is created to avoid circular import
from app import views
