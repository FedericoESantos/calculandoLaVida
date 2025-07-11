# 📊 Calculando la Vida

**Calculando la Vida** es una aplicación web diseñada para simplificar y automatizar procesos de cálculos habituales de la vida diaria o laboral. Su objetivo es ahorrar tiempo en tareas repetitivas, centralizando distintos tipos de cálculos en un solo sistema web fácil de usar.

---

## 🚀 Tecnologías utilizadas

- 🐍 **Python**
- 🌐 **Flask** — micro framework web.
- 🔐 **Flask-CORS** — para permitir solicitudes desde distintos orígenes.
- 📧 **smtplib** — envío de emails desde la app.
- 🔒 **python-dotenv** — para manejar variables de entorno (como contraseñas o credenciales) de forma segura.

---

## 📦 Instalación y ejecución

1. Clonar el repositorio o descargar los archivos.
2. Instalar las dependencias necesarias:

```bash
pip install -r requirements.txt
Crear un archivo .env en la raíz del proyecto con esta variable:

ini
Copiar
Editar
GMAIL_APP_PASSWORD=tu_clave_de_aplicacion
Ejecutar la aplicación:

bash
Copiar
Editar
python app.py
Acceder desde el navegador a:

arduino
Copiar
Editar
http://localhost:5000

📬 Funcionalidad de contacto
El sitio incluye un formulario de contacto que permite a los usuarios enviar mensajes directamente al email configurado en la app. Utiliza SMTP de Gmail para el envío y lee la contraseña de aplicación desde la variable de entorno para mayor seguridad.

📂 Estructura básica del proyecto
bash
Copiar
Editar
calculando-la-vida/
├── public/               # Archivos estáticos (HTML, CSS, JS, imágenes)
├── .env                  # Variables de entorno (no subir a Git)
├── app.py                # Código principal de la aplicación
├── requirements.txt      # Dependencias del proyecto
└── README.md             # Este archivo
📌 Notas
Recordá no compartir el .env ni contraseñas sensibles.

El proyecto está pensado para ejecutarse en entorno local o servidor privado.

📣 Autor
Fede — Full Stack Web Developer
📧 boomartsfs@gmail.com