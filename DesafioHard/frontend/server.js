const express = require('express');
const app = express();
const path = require('path');
const port = 80;
const fs = require('fs');

// app.use('/', express.static(path.join(__dirname, '/src/styles')));
// app.use('/', express.static(path.join(__dirname, '/src/gameplay')));
app.use(express.static(path.join(__dirname, '/src')));

app.listen(port, () => console.log(`Ouvindo na porta ${port} ...`));
