//--------------------------------------------Variables
const darkModeBtn = document.querySelector('#dark-mode-btn')
//--------------------------------------------Functions
// Checks for dark mode and changes the theme accordingly.
const darkModeStatusHandler = () => {
    let theme = localStorage.getItem('theme') || 'light'
    if (theme === 'light') {
        localStorage.setItem('theme', 'dark')
    } else {
        localStorage.setItem('theme', 'light')
    }
    darkModeHandler()
}
//--------------------------------------------Events
darkModeBtn.addEventListener('click', darkModeStatusHandler)