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

let touchStartX = 0;

track.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
  track.dataset.mouseDownAt = touchStartX;
});

track.addEventListener("touchend", () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
});

track.addEventListener("touchmove", (e) => {
  if (track.dataset.mouseDownAt === "0") return;

  const touchDelta = parseFloat(track.dataset.mouseDownAt) - e.touches[0].clientX;
  const maxDelta = window.innerWidth / 2;

  let percentage = (touchDelta / maxDelta) * -100;
  let nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;
  nextPercentage = Math.max(Math.min(nextPercentage, 0), -100);

  track.dataset.percentage = nextPercentage;

  track.style.transform = `translate(${nextPercentage}%, -50%)`;

  for (const image of track.getElementsByClassName("images")) {
    image.style.objectPosition = `${100 + nextPercentage}% center`;
  }
});