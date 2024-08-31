const menuIcon = document.querySelector('#menu-icon');
const navbar = document.getElementById('navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-times');
    menuIcon.classList.toggle('fa-bars');
    navbar.classList.toggle('active'); 
};




function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach((reveal, index) => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;

        // Delay the reveal based on the element's index
        if (elementTop < windowHeight - revealPoint) {
            setTimeout(() => {
                reveal.classList.add('active');
            }, index * 100);  // Adjust the delay multiplier as needed
        }
    });
}

window.addEventListener('scroll', revealOnScroll);



window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrollAlert = document.getElementById('scroll-alert');
    
    header.classList.toggle('scrolled', window.scrollY > 50);
    scrollAlert.classList.toggle('visible', window.scrollY > 500);
});

document.getElementById('menu-icon').addEventListener('click', function() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('active');
});

// Typing animation for the home section
const typingText = document.querySelector('.typing-text span');
const words = ['gym enthusiast', 'fitness lover', 'health seeker'];
let wordIndex = 0;
let letterIndex = 0;

function type() {
    if (letterIndex < words[wordIndex].length) {
        typingText.textContent += words[wordIndex].charAt(letterIndex);
        letterIndex++;
        setTimeout(type, 200);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (letterIndex > 0) {
        typingText.textContent = words[wordIndex].substring(0, letterIndex - 1);
        letterIndex--;
        setTimeout(erase, 100);
    } else {
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    type();
});

// Reveal elements on scroll
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
    revealElements.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 150;

        if (elementTop < windowHeight - revealPoint) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Trigger on page load


document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the membership cards and handle the click events
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove 'selected' class from all cards
            cards.forEach(c => c.classList.remove('selected'));
            // Add 'selected' class to the clicked card
            card.classList.add('selected');

            // Store the selected plan in localStorage
            const plan = card.querySelector('h3').textContent.split(' ')[0].toLowerCase(); // Extract plan name from card title
            localStorage.setItem('selectedPlan', plan);
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the selected plan from localStorage
    const selectedPlan = localStorage.getItem('selectedPlan');

    // Set the corresponding radio button as checked
    if (selectedPlan) {
        const radio = document.querySelector(`input[name="plan"][value="${selectedPlan}"]`);
        if (radio) {
            radio.checked = true;
        }
    }

    // Clear the stored plan after use
    localStorage.removeItem('selectedPlan');
});



document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener('scroll', revealElements);

    function revealElements() {
        var reveals = document.querySelectorAll('.card');

        reveals.forEach(function(card) {
            var windowHeight = window.innerHeight;
            var elementTop = card.getBoundingClientRect().top;
            var elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                card.classList.add('reveal');
            }
        });
    }

    revealElements(); // Reveal elements that are already in view on page load
});








function calculateBMI() {
    var weight = document.getElementById('weight').value;
    var height = document.getElementById('height').value;

    if (weight > 0 && height > 0) {
        var heightInMeters = height / 100;
        var bmi = weight / (heightInMeters * heightInMeters);
        var result = "";

        if (bmi < 18.5) {
            result = "Underweight";
        } else if (bmi >= 18.5 && bmi < 24.9) {
            result = "Normal weight";
        } else if (bmi >= 25 && bmi < 29.9) {
            result = "Overweight";
        } else {
            result = "Obesity";
        }

        document.getElementById('bmiResult').innerHTML = 
            "Your BMI is " + bmi.toFixed(2) + " (" + result + ")";
    } else {
        document.getElementById('bmiResult').innerHTML = 
            "Please enter valid weight and height.";
    }
}





document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetElement = document.querySelector(this.getAttribute('href'));
        const offsetPosition = targetElement.offsetTop - 70; // Adjust the value to control offset

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});




document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll('section');

    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});






function toggleDropdown(id) {
    var dropdown = document.getElementById(id);
    var isActive = dropdown.style.display === 'block';

    // Hide all other dropdowns
    var allDropdowns = document.querySelectorAll('.location-dropdown');
    allDropdowns.forEach(function (drop) {
        drop.style.display = 'none';
    });

    // Toggle the current dropdown
    dropdown.style.display = isActive ? 'none' : 'block';
}




















const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto-slide every 5 seconds
setInterval(nextSlide, 5000);


























document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    const navbar = document.getElementById('navbar');

    menuIcon.addEventListener('click', function() {
        navbar.classList.add('active');
    });

    closeIcon.addEventListener('click', function() {
        navbar.classList.remove('active');
    });
});