from flask import Flask
from flask import render_template
from flask import json
from flask import g
import nodeTree


app = Flask(__name__)
@app.before_request
def before_request():
    g.tree = nodeTree.get_factory()

@app.route("/")
def main():
    return render_template("example1.html", js=node("Inicio"))

@app.route("/node/<path:node_id>")
def node(node_id):
    node_id = unicode(node_id).decode("utf-8")
    js = g.tree.make_recursive_tree(node_id)
    js["adjacents"] = js["children"]
    return json.dumps(js)

if __name__ == "__main__":
    app.run(debug=True)
