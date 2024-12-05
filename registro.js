const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de la solicitud en formato JSON
app.use(bodyParser.json());

// Ruta para recibir los datos y guardarlos en un archivo de texto
app.post('/save', (req, res) => {
    const formData = req.body;
    
    // Convertir los datos en formato de texto
    let dataText = 'Datos de Registro:\n';
    for (let key in formData) {
        if (formData.hasOwnProperty(key)) {
            dataText += `${key}: ${formData[key]}\n`;
        }
    }
    
    // Definir la ruta de la carpeta en el disco D:
    const dirPath = path.join('D:', 'registro_h');
    
    // Crear la carpeta si no existe
    fs.mkdirSync(dirPath, { recursive: true });

    // Definir la ruta del archivo .txt
    const filePath = path.join(dirPath, 'registro.txt');
    
    // Guardar los datos en un archivo .txt
    fs.appendFile(filePath, dataText + '\n\n', (err) => {
        if (err) {
            console.error('Error al guardar los datos:', err);
            res.status(500).send({ message: 'Error al guardar los datos' });
        } else {
            res.status(200).send({ message: 'Datos guardados correctamente' });
        }
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
