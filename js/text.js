const texts = ['Aaryaman Singh', 'Studying Engineering at UofT'];
let textIndex = 0;
let charIndex = 0;
let typingDelay = 150;
let erasingDelay = 100;
let newTextDelay = 1000;
let initialText = "I'm ";
let element = null;
let isAnimating = false;

function type() {
  if (!element) {
    element = document.getElementById('typing');
    if (!element) return;
  }
  
  if (charIndex < texts[textIndex].length) {
    element.textContent = initialText + texts[textIndex].substring(0, charIndex + 1);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (!element) return;
  
  if (charIndex > 0) {
    element.textContent = initialText + texts[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textIndex = (textIndex + 1) % texts.length;
    charIndex = 0;
    setTimeout(type, typingDelay);
  }
}

function startTyping() {
  if (isAnimating) return;
  
  element = document.getElementById('typing');
  if (!element) return;
  
  isAnimating = true;
  element.textContent = initialText;
  charIndex = 0;
  setTimeout(type, typingDelay);
}

// Initial page load
document.addEventListener('DOMContentLoaded', startTyping);

// Astro view transitions
document.addEventListener('astro:page-load', () => {
  isAnimating = false;
  startTyping();
});

// Regular navigation fallback
document.addEventListener('pageshow', (event) => {
  if (!isAnimating) {
    startTyping();
  }
});
