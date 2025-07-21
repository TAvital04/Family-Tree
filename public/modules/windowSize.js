const log = document.querySelector(".log");


function narrow() {
    log.style.marginLeft = "20%";
    log.style.marginRight = "20%";
}

function wide() {
    log.style.marginLeft = "30%";
    log.style.marginRight = "30%";
}

function renderResize(width) {
    if(width < 900) {
        narrow();
    } else {
        wide();
    }
}

renderResize(window.innerWidth);

window.addEventListener("resize", () => {
    renderResize(window.innerWidth);
});