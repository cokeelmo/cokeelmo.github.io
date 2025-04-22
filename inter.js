const track = document.getElementById("portfolio-track");
let currentPercentage = 0;

// Initialize percentage
track.dataset.percentage = currentPercentage;

// Handle scroll events only when hovering the track
track.addEventListener('wheel', (e) => {
    e.preventDefault();

    // Adjust sensitivity for trackpad/mouse
    const scrollMultiplier = e.deltaMode === 1 ? 20 : 1;
    const scrollDelta = e.deltaY * scrollMultiplier * 0.3;
    
    // Update percentage based on scroll
    currentPercentage = parseFloat(track.dataset.percentage || 0);
    let nextPercentage = currentPercentage - (scrollDelta / (window.innerHeight / 2)) * 100;
    
    // Clamp values between 0 and -100
    nextPercentage = Math.max(Math.min(nextPercentage, 0), -100);
    track.dataset.percentage = nextPercentage;

    // Animate both track and images
    track.animate({
        transform: `translate(-50%, ${nextPercentage}%)`
    }, {
        duration: 1200,
        fill: "forwards"
    });

    for (const image of track.getElementsByClassName("images")) {
        image.animate({
            objectPosition: `center ${100 + nextPercentage}%`
        }, {
            duration: 1200,
            fill: "forwards"
        });
    }
}, { passive: false });
