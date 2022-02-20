const express = require('express');
const app = express();
const path = require('path');
const port = 2500;
const fs = require('fs');

// app.use('/', express.static(path.join(__dirname, '/src/styles')));
// app.use('/', express.static(path.join(__dirname, '/src/gameplay')));
// app.use('/', express.static(path.join(__dirname, '/src')));

// app.get('/get-assets', (req, res) => {
// 	const data = getFilesInsideDirectory('./src/assets');
// 	const data = getFilesInsideDirectory('../frontend/src/assets');
// 	res.send(data);
// });

// function getFilesInsideDirectory(directory) {
// 	const filesArray = [];

// 	function readPath(directory) {
// 		const dirRead = fs.readdirSync(directory);

// 		for (const file of dirRead) {
// 			const absolutePath = path.join(directory, file);

// 			if (fs.statSync(absolutePath).isDirectory()) {
// 				readPath(absolutePath);
// 			} else {
// 				filesArray.push(absolutePath);
// 			}
// 		}
// 	}

// 	readPath(directory);

// 	return filesArray;
// }

app.listen(port, () => console.log(`Ouvindo na porta ${port} ...`));
