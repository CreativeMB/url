const express = require('express');
const mega = require('megajs');
const app = express();

// Mapa de videos con sus respectivos IDs y claves de encriptación
const videoMap = {
  video1: { id: 'iqoXzIYa', key: 'nEuDpa1xbmXi5NhYT3ngjtfqsXZYzjusjg7SpFoghVM' },  // Primer video
  video2: { id: 'OtroID1', key: 'OtraClave1' },               // Segundo video
  video3: { id: 'OtroID2', key: 'OtraClave2' },               // Tercer video
  video4: { id: 'OtroID3', key: 'OtraClave3' },               // Cuarto video
  // Agrega más videos aquí conforme sea necesario
};

// Endpoint dinámico para transmitir videos
app.get('/stream/:videoId', (req, res) => {
  const videoId = req.params.videoId;
  const video = videoMap[videoId];

  if (video) {
    const file = mega.file({
      downloadId: video.id,
      key: video.key
    });

    // Configura la cabecera para streaming
    res.writeHead(200, { 'Content-Type': 'video/mp4' });

    // Manejo de errores durante la descarga
    file.download()
      .on('error', (err) => {
        console.error('Error downloading file:', err);
        res.status(500).send('Error downloading video');
      })
      .pipe(res);
  } else {
    res.status(404).send('Video not found');
  }
});

// Configuración del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
