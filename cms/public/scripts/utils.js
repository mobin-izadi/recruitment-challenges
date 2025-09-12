//Check local storage, if it is dark, enable dark.
const darkModeHandler = () => {
    let theme = localStorage.getItem('theme') || 'light'


    if (theme === 'dark') {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }

}


export { darkModeHandler }