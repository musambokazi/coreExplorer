from flask import Flask
from flask_cors import CORS

from blueprints.main import main_bp
from config import Config, TestingConfig
from models import db


def create_app(config_class=None):
    app = Flask(__name__)
    config_class = config_class or Config
    app.config.from_object(config_class)

    db.init_app(app)
    CORS(app)
    app.register_blueprint(main_bp)

    with app.app_context():
        db.create_all()

    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True)
