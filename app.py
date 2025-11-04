from flask import Flask, render_template, request, flash, redirect, url_for
import json
import os

app = Flask(__name__)
app.secret_key = "your-secret-key-here"  # Change this to a random secret key


def load_portfolio_data():
    """Load portfolio data from JSON file"""
    json_path = os.path.join(app.static_folder, "data", "portfolio.json")
    try:
        with open(json_path, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Portfolio data file not found at {json_path}")
        return {}
    except json.JSONDecodeError:
        print(f"Invalid JSON in {json_path}")
        return {}


@app.route("/")
def home():
    data = load_portfolio_data()
    return render_template("index.html", data=data)


@app.route("/contact", methods=["POST"])
def contact():
    if request.method == "POST":
        name = request.form.get("name")
        email = request.form.get("email")
        message = request.form.get("message")

        # Here you would typically save to database or send email
        print(f"Contact form submission:")
        print(f"Name: {name}")
        print(f"Email: {email}")
        print(f"Message: {message}")

        flash("Thank you for your message! I'll get back to you soon.", "success")
        return redirect(url_for("home") + "#contact")


if __name__ == "__main__":
    app.run(debug=True)
