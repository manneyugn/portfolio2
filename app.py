from flask import Flask, render_template
import json
import os

app = Flask(__name__)


def load_portfolio_data():
    """Load portfolio data from JSON file"""
    json_path = os.path.join(app.static_folder, "data", "portfolio.json")
    try:
        with open(json_path, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        raise FileNotFoundError(f"Portfolio data file not found at {json_path}")
    except json.JSONDecodeError as e:
        raise json.JSONDecodeError(
            f"Invalid JSON in {json_path}: {e.msg}", e.doc, e.pos
        )


@app.route("/")
def home():
    data = load_portfolio_data()
    return render_template("index.html", data=data)


if __name__ == "__main__":
    app.run(debug=True)
