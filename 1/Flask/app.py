from flask import Flask, request, jsonify, render_template
import sqlite3

app = Flask(__name__)

DATABASE = "sensor_data.db"

def init_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS sensors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        temperature REAL,
        humidity REAL,
        light INTEGER,
        soil INTEGER,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    """)

    conn.commit()
    conn.close()

init_db()

@app.route("/")
def dashboard():
    return render_template("dashboard.html")

@app.route("/data", methods=["POST"])
def receive_data():

    data = request.json

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO sensors (temperature, humidity, light, soil)
        VALUES (?, ?, ?, ?)
    """, (data["temperature"], data["humidity"], data["light"], data["soil"]))

    conn.commit()
    conn.close()

    return jsonify({"message": "saved"})

@app.route("/data", methods=["GET"])
def get_data():

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute("""
        SELECT temperature, humidity, light, soil, timestamp
        FROM sensors
        ORDER BY id DESC
        LIMIT 20
    """)

    rows = cursor.fetchall()
    conn.close()

    return jsonify(rows[::-1])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)