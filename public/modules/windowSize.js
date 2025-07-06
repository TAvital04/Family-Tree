function wide() {

}

function narrow() {

}

function renderResize(width) {
    if(width < 1000) {
        wide();
    } else {
        narrow();
    }
}

renderResize(window.innerWidth);

window.addEventListener("resize", () => {
    renderResize(window.innerWidth);
});