const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

//haeder on smaller screen btn
const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

const words = ["Web Developer", "Web Designer"];
let wordIndex = 0;
let charIndex = 0;
let typingDelay = 150;
let erasingDelay = 100;
let newWordDelay = 2000; // Delay between words

const typingText = document.querySelector("#typed-text"); // Make sure you have this element in HTML

function type() {
  if (charIndex < words[wordIndex].length) {
    typingText.textContent += words[wordIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newWordDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typingText.textContent = words[wordIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    wordIndex++;
    if (wordIndex >= words.length) wordIndex = 0; // Loop back to first word
    setTimeout(type, typingDelay);
  }
}

// Start the typing effect
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, newWordDelay);
});

//modals

document.addEventListener("DOMContentLoaded", () => {
  const openBtns = document.querySelectorAll(".open-modal");
  const modals = document.querySelectorAll(".modal");
  const closeBtns = document.querySelectorAll(".modal .close");

  openBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute("data-modal");

      // Hide all modals first
      modals.forEach((m) => (m.style.display = "none"));

      // Show only the clicked one
      document.getElementById(modalId).style.display = "block";
    });
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest(".modal").style.display = "none";
    });
  });

  window.addEventListener("click", (e) => {
    modals.forEach((modal) => {
      if (e.target === modal) modal.style.display = "none";
    });
  });
});

const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

//form
const form = document.querySelector("form");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const response = await fetch(form.action, {
    method: form.method,
    body: formData,
    headers: { Accept: "application/json" },
  });

  if (response.ok) {
    formMessage.style.display = "block";
    form.reset();
  } else {
    alert("Oops! There was a problem submitting the form.");
  }
});
