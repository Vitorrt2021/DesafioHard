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

// var adjustSize = function () {
//   let iWidth = $("#gameplay_interface").width(); // Desconta duas vezes o tamanho da borda
//   let iHeight = $("#gameplay_interface").height(); // Mantém o aspecto 4:3 para a largura (width) fixa
//   console.log(iHeight);
//   console.log(window.innerHeight);
//   if (iHeight >= window.innerHeight) {
//     console.log("ibgger");
//     $("#gameplay_interface").width(iWidth + "px");
//     $("#gameplay_interface").height(iHeight + "px");
//   } else {
//     $("#gameplay_interface").width("100%");
//     $("#gameplay_interface").height("100%");
//   }
// };

// window.onresize = adjustSize;
// adjustSize();
// startResize();
// function startResize() {
//   window.addEventListener(
//     "load",
//     () => {
//       resize();
//     },
//     false
//   );
//   window.addEventListener(
//     "resize",
//     () => {
//       resize();
//     },
//     false
//   );
// }
// function resize() {
//   let height = window.innerHeight;
//   let ratio =
//     $("#gameplay_interface").width() / $("#gameplay_interface").height();
//   let width = height * ratio;

//   if (height > window.innerHeight) {
//     width = window.innerWidth;
//     ratio =
//       $("#gameplay_interface").width() / $("#gameplay_interface").height();
//     height = width * ratio;
//   }
//   $("#gameplay_interface").width(width);
//   $("#gameplay_interface").height(height);
// }
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
