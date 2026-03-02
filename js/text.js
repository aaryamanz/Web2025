(function() {
  const text = 'Aaryaman Singh';
  let charIndex = 0;
  const typingDelay = 220;
  const initialText = '';
  let element = null;
  let typeTimeout = null;

  function type() {
    element = document.getElementById('typing');
    if (!element) return;

    if (charIndex < text.length) {
      element.textContent = initialText + text.substring(0, charIndex + 1);
      charIndex++;
      typeTimeout = setTimeout(type, typingDelay);
    }
  }

  function startTyping() {
    if (typeTimeout) clearTimeout(typeTimeout);

    element = document.getElementById('typing');
    if (!element) return;

    element.textContent = initialText;
    charIndex = 0;
    typeTimeout = setTimeout(type, typingDelay);
  }

  document.addEventListener('DOMContentLoaded', startTyping);
  document.addEventListener('astro:page-load', startTyping);
  document.addEventListener('pageshow', startTyping);
})();
