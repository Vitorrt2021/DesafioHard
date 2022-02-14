import Game from "../Components/Game.js";

$(document).ready(function () {
  $(".cat_tower").on("dragstart", function (event) {
    event.originalEvent.dataTransfer.setData("text", "cat_tower_level1");
    console.log("ondragstart");
  });

  $("#canvas1").on("dragover", function (event) {
    event.originalEvent.preventDefault();
    console.log("ondragover");
  });

  $("#canvas1").on("drop", function (event) {
    console.log("ondrop");
    event.originalEvent.preventDefault();
    let data = event.originalEvent.dataTransfer.getData("text");
    console.log(data + " eae?");
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
