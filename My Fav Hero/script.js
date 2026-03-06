// ==========================================
// 1. Typing Effect for the Hero Heading
// ==========================================
const heroHeading = document.querySelector('.hero-content h1');
const textToType = "The Power Within";
let index = 0;

function typeWriter() {
    if (index < textToType.length) {
        heroHeading.textContent += textToType.charAt(index);
        index++;
        setTimeout(typeWriter, 100); // 100ms delay between each letter
    }
}

// Start the typing effect half a second after the page loads
setTimeout(typeWriter, 500);

// ==========================================
// 2. Scroll Fade-In Animation for Cards
// ==========================================
const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // If the card is visible in the viewport
        if (entry.isIntersecting) {
            entry.target.classList.add('show'); // Add the class that fades it in
            observer.unobserve(entry.target); // Stop observing once it appears
        }
    });
}, {
    threshold: 0.1 // Trigger when 10% of the card is visible
});

// Attach the observer to every card on the page
cards.forEach(card => {
    observer.observe(card);
});
// ==========================================
// 3. Dynamic Character Roster
// ==========================================

// This is our "Database" - an array of objects
const characters = [
    {
        id: "krishna",
        name: "Krishna / Kid Krrish",
        role: "The Hero",
        desc: "A pure-hearted young boy who inherits an alien sundial watch from his father. With superhuman strength, speed, and agility, he transforms into Kid Krrish to protect the innocent and uphold justice."
    },
    {
        id: "jadoo",
        name: "Jadoo",
        role: "Extraterrestrial Ally",
        desc: "A friendly alien with extraordinary abilities who draws power from the sun. He forms an unbreakable telepathic and emotional bond with Krishna, guiding him through his toughest battles."
    },
    {
        id: "drpar",
        name: "Dr. Par",
        role: "Primary Antagonist",
        desc: "A brilliant but mad scientist obsessed with acquiring alien technology. He will stop at nothing to steal Krishna's sundial watch and use its power for his own twisted world-domination plans."
    },
    {
        id: "dadi",
        name: "Grandmother",
        role: "Guardian",
        desc: "Krishna's loving and protective grandmother. Knowing the dangers of the world, she moves Krishna to the remote mountains of Himachal to keep his powers a secret and keep him safe."
    }
];

// Grab the HTML elements we need to update
const buttonContainer = document.getElementById('char-buttons');
const displayName = document.getElementById('display-name');
const displayRole = document.getElementById('display-role');
const displayDesc = document.getElementById('display-desc');

// Function to update the display card
function updateDisplay(character) {
    // Briefly remove and re-add animation class for a smooth transition effect
    const displayCard = document.getElementById('char-display');
    displayCard.classList.remove('fade-in-text');
    
    // Slight delay to allow CSS to reset
    setTimeout(() => {
        displayName.textContent = character.name;
        displayRole.textContent = `Status: ${character.role}`;
        displayDesc.textContent = character.desc;
        displayCard.classList.add('fade-in-text');
    }, 50);
}

// Generate the buttons dynamically based on our array
characters.forEach((char, index) => {
    const btn = document.createElement('button');
    btn.textContent = char.name;
    btn.classList.add('char-btn');
    
    // Make the first button active by default
    if (index === 0) {
        btn.classList.add('active');
        updateDisplay(char); // Load the first character's data immediately
    }

    // Add click event to each button
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelectorAll('.char-btn').forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        // Update the screen with this character's data
        updateDisplay(char);
    });

    buttonContainer.appendChild(btn);
});
// ==========================================
// 4. Trailer Modal Logic
// ==========================================
const openTrailerBtn = document.getElementById('open-trailer');
const closeModalBtn = document.getElementById('close-modal');
const trailerModal = document.getElementById('trailer-modal');
const trailerVideo = document.getElementById('trailer-video');
const videoSrc = trailerVideo.src; // Save the original video link

// Function to open the modal
openTrailerBtn.addEventListener('click', () => {
    trailerModal.classList.add('show-modal');
});

// Function to close the modal
function closeTrailer() {
    trailerModal.classList.remove('show-modal');
    // Reset the video source to stop it from playing in the background
    trailerVideo.src = ''; 
    setTimeout(() => {
        trailerVideo.src = videoSrc; 
    }, 400); // Wait for the fade-out animation to finish before resetting
}

// Close when clicking the 'X' button
closeModalBtn.addEventListener('click', closeTrailer);

// Close when clicking the dark background outside the video
trailerModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        closeTrailer();
    }
});

// Close when pressing the "Escape" key on the keyboard
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && trailerModal.classList.contains('show-modal')) {
        closeTrailer();
    }
});