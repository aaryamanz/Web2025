(function() {
  const texts = ['Aaryaman Singh', "I'm studying Engineering at UofT"];
  let textIndex = 0;
  let charIndex = 0;
  const typingDelay = 220;
  const erasingDelay = 80;
  const newTextDelay = 2000;
  const initialText = '';
  let element = null;
  let typeTimeout = null;
  let eraseTimeout = null;

  function type() {
    element = document.getElementById('typing');
    if (!element) return;

    if (charIndex < texts[textIndex].length) {
      element.textContent = initialText + texts[textIndex].substring(0, charIndex + 1);
      charIndex++;
      typeTimeout = setTimeout(type, typingDelay);
    } else {
      eraseTimeout = setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (!element) return;

    if (charIndex > 0) {
      element.textContent = initialText + texts[textIndex].substring(0, charIndex - 1);
      charIndex--;
      eraseTimeout = setTimeout(erase, erasingDelay);
    } else {
      textIndex = (textIndex + 1) % texts.length;
      charIndex = 0;
      typeTimeout = setTimeout(type, typingDelay);
    }
  }

  function startTyping() {
    if (typeTimeout) clearTimeout(typeTimeout);
    if (eraseTimeout) clearTimeout(eraseTimeout);

    element = document.getElementById('typing');
    if (!element) return;

    element.textContent = initialText;
    charIndex = 0;
    textIndex = 0;
    typeTimeout = setTimeout(type, typingDelay);
  }

  document.addEventListener('DOMContentLoaded', startTyping);
  document.addEventListener('astro:page-load', startTyping);
  document.addEventListener('pageshow', startTyping);
})();
