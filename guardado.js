const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const FILE_PATH = "D:/hotel/reservaciones.txt";

// Middleware para manejar JSON
app.use(express.json());

// Ruta para manejar la reservación
app.post("/reservar", (req, res) => {
    const datos = req.body;

    // Crear la carpeta si no existe
    const folderPath = path.dirname(FILE_PATH);
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    // Formatear los datos como texto
    const contenido = `
===========================
Nombre: ${datos.nombre_completo}
Correo: ${datos.correo_electronico}
Cédula: ${datos.cedula_identidad}
Dirección: ${datos.direccion}
Fecha de llegada: ${datos.fecha_llegada}
Fecha de salida: ${datos.fecha_salida}
Tipo de habitación: ${datos.tipo_habitacion}
Motivo: ${datos.motivo_hospedaje}
Comentarios: ${datos.comentarios}
Forma de pago: ${datos.forma_pago}
${datos.forma_pago === "tarjeta" ? `
Datos de Tarjeta:
    Número: ${datos.numero_tarjeta}
    Vencimiento: ${datos.fecha_vencimiento}
    Código: ${datos.codigo_seguridad}` : ""}
===========================
`;

    // Escribir en el archivo
    fs.appendFile(FILE_PATH, contenido, (err) => {
        if (err) {
            console.error("Error al guardar los datos:", err);
            return res.status(500).json({ message: "Error al guardar la reservación." });
        }
        res.json({ message: "Reservación guardada exitosamente." });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
