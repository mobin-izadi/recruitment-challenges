//Check local storage, if it is dark, enable dark.
const darkModeHandler = () => {
    let theme = localStorage.getItem('theme') || 'light'
    const drakModeIcon = document.querySelector('.dark-btn__icon') || false


    if (theme === 'dark') {
        document.documentElement.classList.add('dark')

        drakModeIcon ? drakModeIcon.setAttribute('href', '#light') : ''
    } else {
        document.documentElement.classList.remove('dark')
        drakModeIcon.setAttribute('href', '#dark')
    }

}

// Show the VPN activation message.
const showVpnActivation = () => {
    Swal.fire({
        title: 'اطلاعیه مهم',
        text: 'برای استفاده از سایت، حتما باید VPN روشن باشه!',
        icon: 'warning',
        confirmButtonText: 'روشنه',
        allowOutsideClick: false,
        allowEscapeKey: false,
        customClass: {
            popup: 'dark:!bg-gray-700 dark:!text-white',
        }
    });
}
// Open and close the sidebar
const sidebarHandler = (status) => {
    const sidebarWrapper = document.querySelector('.sidebar')
    if (status === 'open') {
        sidebarWrapper.classList.add('sidebar--open')
    } else if (status === 'close') {
        sidebarWrapper.classList.remove('sidebar--open')
    } else {

    }
}
//Save the sent variable to local storage.
const setLocalStorage = (key, value) => {
    localStorage.setItem(key, value)
}
const getLocalStorage = (key) => {
    let value = localStorage.getItem(key)
    return value
}

export { darkModeHandler, showVpnActivation, sidebarHandler, setLocalStorage, getLocalStorage }