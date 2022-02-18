var modal = document.querySelector(".modal");
var btn = document.querySelector(".red__button");

// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", (event) => {
    console.log(event.target)
    if (event.target != btn) {
        modal.style.display = "none";
    }
})