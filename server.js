const express = require('express');
const mega = require('megajs');
const app = express();

const MEGA_FILE_ID = '<OmQGCAza>';      // Coloca el ID del archivo aquí
const MEGA_ENCRYPTION_KEY = '<VBWcHgnr62pDrtB_nQNbUQ>';   // Coloca la clave de encriptación aquí

app.get('/stream', (req, res) => {
  const file = mega.file({
    downloadId: MEGA_FILE_ID,
    key: MEGA_ENCRYPTION_KEY
  });

  // Configura la cabecera para streaming
  res.writeHead(200, { 'Content-Type': 'video/mp4' });

  // Descarga y retransmite el archivo en tiempo real
  file.download().pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
