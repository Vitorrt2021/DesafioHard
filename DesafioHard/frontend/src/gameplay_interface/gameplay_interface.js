import Game from '../Components/Game.js';

const preventReload = () => {
	window.addEventListener('beforeunload', function (e) {
		e.preventDefault();
		// In Mozilla Firefox prompt will always be shown
		// Chrome requires returnValue to be set
		e.returnValue = '';
	});
};

$(document).ready(function () {
	$('#score_value').on('input', preventReload);

	$('.cat_tower').on('dragstart', function (event) {
		event.originalEvent.dataTransfer.setData(
			'text',
			'cat_tower_level_1'
		);
	});

	$('.blue_rabbit_tower').on('dragstart', function (event) {
		event.originalEvent.dataTransfer.setData(
			'text',
			'blue_rabbit_tower_level_1'
		);
	});

	$('.red_rabbit_tower').on('dragstart', function (event) {
		event.originalEvent.dataTransfer.setData(
			'text',
			'red_rabbit_tower_level_1'
		);
	});

	$('#canvas1').on('dragover', function (event) {
		event.originalEvent.preventDefault();
	});

	const game = new Game();
	game.start();
});
// document.addEventListener("drag", (event) => {
// event.target.
// })

// function allowDrop(ev) {
//   ev.preventDefault();
// }

// function drag(ev) {
//   ev.dataTransfer.setData("text", ev.target.id);
// }

// function drop(ev) {
//   ev.preventDefault();
//   var data = ev.dataTransfer.getData("text");
//   ev.target.appendChild(document.getElementById(data));
// }
// </script>
// </head>
// <body>

// <h2>Drag and Drop</h2>
// <p>Drag the image back and forth between the two div elements.</p>

// <div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)">
//   <img src="img_w3slogo.gif" draggable="true" ondragstart="drag(event)" id="drag1" width="88" height="31">
// </div>

// <div id="div2" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
