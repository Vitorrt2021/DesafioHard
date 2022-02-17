const express = require('express');
const app = express();
const port = 80;

app.use(express.static(__dirname + '/src'));
app.use(express.static(__dirname + '/src/gameplay_interface'));

app.listen(port, () => console.log(`Ouvindo na porta ${port} ...`));
