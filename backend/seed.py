from app import app
from models import db, Institution

with app.app_context():
    university1= Institution(name="University of Cape Town", province="Western Cape", institution_type="University")
    school2 = Institution(name="Durban High School", province="KwaZulu-Natal", institution_type="High School")
    college1 = Institution(name="False Bay TVET College", province="Western Cape", institution_type="TVET College")

    db.session.add(university1)
    db.session.add(school2)
    db.session.add(college1)
    db.session.commit()