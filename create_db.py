# create_db.py
from api.api import db, app

with app.app_context():
    db.create_all()
    print("Database tables created successfully.")