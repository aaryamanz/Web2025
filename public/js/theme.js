(function() {
  const THEME_KEY = 'theme';
  const DARKMODE_CLASS = 'darkmode';

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function getStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null;
    }
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add(DARKMODE_CLASS);
    } else {
      root.classList.remove(DARKMODE_CLASS);
    }
  }

  function getActiveTheme() {
    const stored = getStoredTheme();
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return getSystemTheme();
  }

  function changeTheme() {
    const root = document.documentElement;
    const isDark = root.classList.contains(DARKMODE_CLASS);
    const newTheme = isDark ? 'light' : 'dark';

    // Disable transitions briefly to prevent flash
    const style = document.createElement('style');
    style.textContent = '* { transition: none !important; }';
    document.head.appendChild(style);

    applyTheme(newTheme);
    try {
      localStorage.setItem(THEME_KEY, newTheme);
    } catch (e) {}

    // Re-enable transitions
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.head.removeChild(style);
      });
    });
  }

  function preloadTheme() {
    const theme = getActiveTheme();
    applyTheme(theme);
  }

  function initTheme() {
    preloadTheme();

    // Listen for system theme changes (when user hasn't set a preference)
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
      if (!getStoredTheme()) {
        applyTheme(getSystemTheme());
      }
    });

    // Attach toggle button listeners
    function initButtons() {
      const btns = document.querySelectorAll('#header-theme-button, #drawer-theme-button, .theme-toggle');
      btns.forEach(btn => {
        btn.removeEventListener('click', changeTheme);
        btn.addEventListener('click', changeTheme);
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initButtons);
    } else {
      initButtons();
    }
    document.addEventListener('astro:page-load', () => {
      initButtons();
      preloadTheme(); // Re-apply theme after navigation (html element gets reset)
    });
    document.addEventListener('astro:after-swap', preloadTheme);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
})();
