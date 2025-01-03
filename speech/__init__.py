from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    #app.config.from_object(config)
    app.config.from_envvar('APP_CONFIG_FILE')
    CORS(app, resources={
        r"/*": {
            "origins": ["https://hi.connectenglish.kr/", "https://smartree.co.kr"]
        }
    })  # 모든 도메인 허용


    # ORM
    db.init_app(app)
    migrate.init_app(app, db)

    # 블루프린트
    from .views import main_views, SST_views, TTS_views, test_views, portfolio_views
    app.register_blueprint(main_views.bp)
    app.register_blueprint(SST_views.bp)
    app.register_blueprint(TTS_views.bp)
    app.register_blueprint(test_views.bp)
    app.register_blueprint(portfolio_views.bp)

    return app
