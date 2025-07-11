import os
from flask import Flask, request, send_from_directory, jsonify
from flask_cors import CORS
import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder='public')
CORS(app)

# Servir index
@app.route('/')
def index():
    return send_from_directory('public', 'index.html')

# Servir otros archivos estáticos (css, js, imágenes)
@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('public', path)

# Recibir formulario de contacto
@app.route('/enviar', methods=['POST'])
def enviar():
    data = request.get_json()
    nombre = data.get('nombre')
    email = data.get('email')
    mensaje = data.get('mensaje')

    if not nombre or not email or not mensaje:
        return jsonify({'error': 'Faltan datos'}), 400

    try:
        msg = EmailMessage()
        msg['Subject'] = f'Mensaje de {nombre}'
        msg['From'] = 'boomartsfs@gmail.com'
        msg['To'] = 'boomartsfs@gmail.com'
        msg.set_content(f"De: {nombre} ({email})\n\nMensaje:\n{mensaje}")

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()

        # Recuperar contraseña desde variable de entorno
        PASSWORD = os.getenv('GMAIL_APP_PASSWORD')

        # Validar que esté definida
        if not PASSWORD:
            raise ValueError("No se encontró la variable de entorno GMAIL_APP_PASSWORD")

        server.login('boomartsfs@gmail.com', PASSWORD)
        server.send_message(msg)
        server.quit()

        return jsonify({'mensaje': 'Mensaje enviado con éxito. A la brevedad te responderemos!'})

    except Exception as e:
        print('Error al enviar:', e)
        return jsonify({'error': 'Error al enviar el mensaje'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
