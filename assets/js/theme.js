// Dark/light mode toggle with localStorage persistence
const currentTheme = localStorage.getItem('theme') || 'light';
const themeIcon = document.querySelector('.theme-icon');

if (currentTheme === 'dark') {
    document.documentElement.classList.add('dark');
    if (themeIcon) themeIcon.textContent = '\u2600\uFE0F';
} else {
    if (themeIcon) themeIcon.textContent = '\uD83C\uDF19';
}

function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    const icon = document.querySelector('.theme-icon');

    if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        if (icon) icon.textContent = '\uD83C\uDF19';
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        if (icon) icon.textContent = '\u2600\uFE0F';
    }
}
