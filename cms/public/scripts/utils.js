//Check local storage, if it is dark, enable dark.
const darkModeHandler = () => {
    let theme = localStorage.getItem('theme') || 'light'


    if (theme === 'dark') {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
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


export { darkModeHandler, showVpnActivation }