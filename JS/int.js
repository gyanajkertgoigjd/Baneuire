// ============================
// BANEUIRE | INITIAL.JS
// ============================

// Navbar Scroll Effect
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});

// ============================
// Smooth Scrolling
// ============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

// ============================
// Active Navigation Link
// ============================

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.forEach(item => item.classList.remove("active"));

        link.classList.add("active");

    });

});

// ============================
// Hero Fade In
// ============================

window.addEventListener("load", () => {

    const hero = document.querySelector(".hero-content");

    if(hero){

        hero.style.opacity = "1";

        hero.style.transform = "translateY(0px)";

    }

});