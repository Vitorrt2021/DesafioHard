const app = require('./controllers/app.js');
const port = 5000;

app.listen(port, () => console.log(`Ouvindo na porta ${port}...`));
