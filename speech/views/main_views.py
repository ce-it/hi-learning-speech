from flask import Blueprint, render_template


bp = Blueprint('main', __name__, url_prefix='/')


@bp.route('/hello')
def hello_pybo():
    return render_template('index.html')
@bp.route('/speech')

def hello_speech():
    return render_template('index2.html')

@bp.route('/STP')
def hi_speech():
    return render_template('speech.html')

@bp.route('/')
def index():
    return 'connectedu'