from flask import Flask, render_template, request, flash, redirect, url_for
import json
import os

# Configure Flask for Vercel
app = Flask(__name__, 
            template_folder='../templates',
            static_folder='../static')
app.secret_key = os.environ.get('SECRET_KEY', 'your-secret-key-here')

def load_portfolio_data():
    """Load portfolio data from JSON file"""
    # Adjust path for Vercel deployment
    json_path = os.path.join(os.path.dirname(__file__), "..", "static", "data", "portfolio.json")
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

# Export the app for Vercel
if __name__ == "__main__":
    app.run(debug=True)