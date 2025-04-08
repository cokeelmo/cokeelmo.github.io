const track = document.getElementById("image-track");
window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}

window.onmouseup = e => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}
window.onmousemove = e => {
    if (track.dataset.mouseDownAt === "0") return;
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;
    const percentage = (mouseDelta / maxDelta) * -100;
    nextpercentage = parseFloat(track.dataset.prevPercentage) + percentage;
    nextpercentage = Math.max(Math.min(nextpercentage, 0), -100);
    track.dataset.percentage = nextpercentage;


    track.animate({transform: `translate(${nextpercentage}%, -50%)`}, {duration: 1200, fill: "forwards"});

    for (const image of track.getElementsByClassName("images")) {
        image.animate({objectPosition: `${100 + nextpercentage}% center`}, {duration: 1200, fill: "forwards"});
    }
}