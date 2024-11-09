from flask import Flask, request, redirect, url_for, abort
from flask.templating import render_template
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, migrate

import flask_admin as admin
from flask_admin.contrib.sqla import ModelView

app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../base_date/curs.db'

app.config['STATIC_FOLDER'] = 'static'
app.static_folder = 'static'


app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['SQLALCHEMY_BINDS'] = {
    'users_orders': 'sqlite:///../base_date/users_orders.db'
    # 'calculations': 'sqlite:///../base_date/curs.db'
}

db = SQLAlchemy(app)
migrate = Migrate(app, db)

class Curs(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    excange_name = db.Column(db.String(20), unique=False, nullable=False)
    currency_pair = db.Column(db.String(20), unique=False, nullable=False)
    owner_curs = db.Column(db.Integer, nullable=False)


    def __repr__(self):
        return f"ID : {self.id} Name : {self.excange_name}, Currency Pair: {self.currency_pair} Owner Curs : {self.owner_curs}"


class Users_Orders(db.Model):
    __bind_key__ = 'users_orders'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=False, nullable=False)
    total_excange = db.Column(db.Integer, nullable=False)
    count_excange = db.Column(db.Integer, nullable=False)
    order = db.Column(db.Integer, nullable=False)
    sell_sum = db.Column(db.Integer, nullable=False)
    buy_sum = db.Column(db.Integer, nullable=False)
    client_where = db.Column(db.String(80), unique=False, nullable=False)
    client_when = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return f"""
        ID : {self.id},
        username : {self.username},
        total_excange: {self.total_excange},
        count_excange : {self.count_excange},
        order : {self.order},
        sell_sum : {self.sell_sum},
        buy_sum: {self.buy_sum},
        client_where : {self.client_where},
        client_when : {self.client_when}"""


class CustomView(ModelView):
    list_template = 'layout-sidenav-light.html'
    create_template = 'layout-static.html'
    edit_template = 'tables.html'


class UserAdmin(CustomView):
    column_searchable_list = ('currency_pair')

# with app.app_context():
#     db.create_all()


@app.route('/')
def Users_Orders_route_main():
    data = Users_Orders.query.filter_by(order=1).all()


    print(data)

    return render_template('index.html', data=data, url_for=url_for)

@app.route('/tables.html')
def curs_route():
    data = Curs.query.all()
    print(data)

    return render_template('tables.html', data=data, url_for=url_for)

# @app.route('/index.html')
# def Users_Orders_route():
#     data = Users_Orders.query.all()
#     #print(data)

#     return render_template('index.html', data=data, url_for=url_for)


@app.route('/tables.html')
def register():
    return render_template('tables.html')

@app.route('/layout-static.html')
def layout_static():
    return render_template('layout-static.html')


@app.route('/layout-sidenav-light.html')
def layout_sidenav():
    return render_template('layout-sidenav-light.html')


@app.route('/charts.html')
def layout_charts():
    return render_template('charts.html')

@app.route('/add/', methods=["POST"])
def add_new_curs():

    id = request.form.get("id")
    excange_name = request.form.get("excange_name")
    currency_pair = request.form.get("currency_pair")
    owner_curs = request.form.get("owner_curs")

    print(request.form)

    if id and excange_name and currency_pair and owner_curs:

        if not id.isdigit():
            print(f"Problem here id = {type(id)} or owner_curs = {type(owner_curs)}")
            abort(400, "Введите число")

        else:
            data_update = Curs.query.get(id)

            if data_update:
                print(data_update)
                data_update.id = id
                data_update.excange_name = excange_name
                data_update.currency_pair = currency_pair
                data_update.owner_curs = owner_curs
                print(data_update)
                db.session.commit()

            else:
                data_add = Curs(id=id, excange_name=excange_name, currency_pair=currency_pair, owner_curs=owner_curs)
                # print(data_add)
                db.session.add(data_add)
                db.session.commit()

        return redirect('/')
    else:
        abort(401, "syk_dannux nety")



@app.route('/update/<int:id>', methods=["POST", "GET"])
def update_curs(id):
    print(id)
    data = Curs.query.get(id)
    print(data)
    return render_template('login.html')


@app.route('/delete/', methods=["POST"])
def delete_curs():
    id = request.form.get("id")
    if not id:
        abort(500)

    data = Curs.query.get(id)
    print(f"Data delete: {data}")
    db.session.delete(data)
    db.session.commit()
    return redirect('/')

if __name__ == '__main__':
    app.run()

# just i can say how u a feel or and pass