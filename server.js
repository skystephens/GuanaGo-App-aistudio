import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;

// Verificar que dist existe
const distPath = path.join(__dirname, 'dist');
console.log(`📁 Sirviendo desde: ${distPath}`);
console.log(`📁 Existe dist: ${fs.existsSync(distPath)}`);

if (fs.existsSync(distPath)) {
  console.log(`📂 Archivos en dist:`, fs.readdirSync(distPath));
}

app.use(express.json());
app.use(express.static(distPath, { 
  maxAge: '1h',
  etag: false 
}));

// API proxy para Airtable/Make Directory
app.post('/api/directory', async (req, res) => {
    try {
        const response = await fetch('https://hook.us1.make.com/gleyxf83giw4xqr7i6i94mb7syclmh2o', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error en Directory API:', error);
        res.status(500).json({ error: error.message });
    }
});

// SPA fallback - servir index.html para rutas no encontradas
app.get('*', (req, res) => {
    const indexPath = path.join(distPath, 'index.html');
    console.log(`📄 Intentando servir: ${indexPath}`);
    console.log(`📄 Existe: ${fs.existsSync(indexPath)}`);
    if (fs.existsSync(indexPath)) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.sendFile(indexPath);
    } else {
        console.error(`❌ index.html no encontrado en ${indexPath}`);
        res.status(404).json({ error: `index.html no encontrado en ${indexPath}`, distPath, indexPath });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`🌐 Accede a http://localhost:${PORT}`);
});
