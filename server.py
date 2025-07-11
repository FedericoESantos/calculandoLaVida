import os
from flask import Flask, request, send_from_directory, jsonify
from flask_cors import CORS
import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv
from flask import Flask, request, send_from_directory, jsonify, render_template

load_dotenv()

# Crear archivo de visitas si no existe
if not os.path.exists('visitas.txt'):
    with open('visitas.txt', 'w') as f:
        f.write('0')

app = Flask(__name__)
CORS(app)

# Servir index
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/comidas')
def comidas():
    return render_template('comidas.html')

@app.route('/viaje')
def viaje():
    return render_template('viajes.html')

@app.route('/dinero')
def dinero():
    return render_template('dinero.html')

@app.route('/conversor')
def conversor():
    return render_template('conversor.html')

@app.route('/fechas')
def fechas():
    return render_template('fechas.html')

@app.route('/contacto')
def contacto():
    return render_template('contacto.html')

@app.route('/contador', methods=['GET'])
def contador_visitas():
    try:
        ip_cliente = request.remote_addr

        # Crear archivo de IPs si no existe
        if not os.path.exists('ips.txt'):
            with open('ips.txt', 'w') as f:
                f.write('')

        # Leer IPs registradas
        with open('ips.txt', 'r') as f:
            ips = f.read().splitlines()

        # Si es una nueva IP
        if ip_cliente not in ips:
            # Agregarla
            with open('ips.txt', 'a') as f:
                f.write(ip_cliente + '\n')

            # Aumentar contador
            with open('visitas.txt', 'r') as archivo:
                visitas = int(archivo.read())
            visitas += 1
            with open('visitas.txt', 'w') as archivo:
                archivo.write(str(visitas))
        else:
            # Si ya existe, leer el valor actual sin aumentar
            with open('visitas.txt', 'r') as archivo:
                visitas = int(archivo.read())

        return jsonify({'visitas': visitas})

    except Exception as e:
        print('Error con el contador:', e)
        return jsonify({'error': 'No se pudo leer el contador'}), 500

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
    while True:
        port = int(os.environ.get('PORT', 5000))
        app.run(host='0.0.0.0', port=port)