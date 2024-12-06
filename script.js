// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent =
        document.body.classList.contains('dark-mode') ? '🌜' : '🌞';
    // Save theme preference to localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Load theme preference on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '🌜';
    }
});

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navbar = document.getElementById('navbar');

hamburger.addEventListener('click', () => {
    navbar.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close navbar when link is clicked (for mobile)
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Smooth Scrolling
const links = document.querySelectorAll('a[href^="#"]');
for (const link of links) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 50, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
}

// Modal Functionality for Projects
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalDescription = document.getElementById('modal-description');
const modalLink = document.getElementById('modal-link');
const closeBtn = document.querySelector('.close-btn');

// Sample project data
const projectsData = {
    1: {
        title: "Project 1",
        image: "assets/images/project1.jpg",
        description: "Detailed description of Project 1. Explain the technologies used, challenges faced, and the outcomes.",
        link: "https://github.com/yourusername/project1"
    },
    2: {
        title: "Project 2",
        image: "assets/images/project2.jpg",
        description: "Detailed description of Project 2. Explain the technologies used, challenges faced, and the outcomes.",
        link: "https://github.com/yourusername/project2"
    },
    3: {
        title: "Project 3",
        image: "assets/images/project3.jpg",
        description: "Detailed description of Project 3. Explain the technologies used, challenges faced, and the outcomes.",
        link: "https://github.com/yourusername/project3"
    }
};

// Open Modal
const modalButtons = document.querySelectorAll('.modal-btn');
modalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const projectId = button.getAttribute('data-project');
        const project = projectsData[projectId];
        if (project) {
            modalTitle.textContent = project.title;
            modalImage.src = project.image;
            modalDescription.textContent = project.description;
            modalLink.href = project.link;
            modal.style.display = 'flex';
        }
    });
});

// Close Modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close Modal when clicking outside the modal content
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Contact Form Submission Handling
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simple client-side validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (name === '' || email === '' || message === '') {
        formMessage.style.color = 'red';
        formMessage.textContent = 'Please fill in all fields.';
        return;
    }
    
    // Submit the form data using Fetch API
    fetch('contact.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`
    })
    .then(response => response.text())
    .then(data => {
        formMessage.style.color = 'green';
        formMessage.textContent = data;
        contactForm.reset();
    })
    .catch(error => {
        formMessage.style.color = 'red';
        formMessage.textContent = 'An error occurred. Please try again later.';
        console.error('Error:', error);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // AOS Initialization
    AOS.init({
        duration: 1000, // Animation duration in ms
        offset: 100, // Start animation when the element is 100px in view
        once: true, // Animation happens only once
    });

    // Theme Toggle (Dark/Light Mode)
    const themeToggleButton = document.getElementById('theme-toggle');
    const rootElement = document.documentElement;  // This is the <html> element

    themeToggleButton.addEventListener('click', () => {
        const currentTheme = rootElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            rootElement.setAttribute('data-theme', 'light');
            themeToggleButton.textContent = '🌞'; // Sun for light mode
        } else {
            rootElement.setAttribute('data-theme', 'dark');
            themeToggleButton.textContent = '🌙'; // Moon for dark mode
        }
    });
});
