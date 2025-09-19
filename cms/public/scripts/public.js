import { darkModeHandler, getLocalStorage, setLocalStorage, showVpnActivation } from "./utils.js"
//--------------------------------------------Variables
const drakModeBtn = document.querySelector('.dark-btn')
const notificationElem = document.querySelector('.notification')
const notificationBtn = document.querySelector('.notification__btn')
const notificationWrapper = document.querySelector('.notification__wrapper')
const notificationCloseBtn = document.querySelector('#notification-close-btn')
const blurEffectElem = document.querySelector('.blur-effect')
const userPanelElm = document.querySelector('.user-panel')
const userPanelBtn = document.querySelector('.user-panel__btn')
const userPanelWrapper = document.querySelector('.user-panel__wrapper')
const menuBtn = document.querySelector('.menu-btn')
const sidebar = document.querySelector('.sidebar')
const sidebarBtn = document.querySelector('.sidebar__btn')



//--------------------------------------------Functions
// Change the theme
const toggleDarkMode = () => {
    let stautsDrakMode = getLocalStorage('theme')

    if (stautsDrakMode === 'light') {
        setLocalStorage('theme', 'dark')
    } else if (stautsDrakMode === 'dark') {
        setLocalStorage('theme', 'light')
    } else {
        setLocalStorage('theme', 'dark')
    }

    darkModeHandler()
}
// Open and close the notification.
const toggleNotification = () => {
    userPanelElm.classList.toggle('z-40')
    notificationWrapper.classList.toggle('hidden')
    notificationWrapper.classList.toggle('flex')
    blurEffectElem.classList.toggle('hidden')
}
// Open and close the user panel.
const ToggleUserPanel = () => {

    notificationElem.classList.toggle('z-40')
    userPanelWrapper.classList.toggle('hidden')
    userPanelWrapper.classList.toggle('flex')
    blurEffectElem.classList.toggle('hidden')

}
// Open and close the menu sidebar.
const ToggleMenu = () => {
    sidebar.classList.toggle('-right-56')
    sidebar.classList.toggle('right-0')
}
//--------------------------------------------Events
window.addEventListener('load', () => {

    darkModeHandler()
})
drakModeBtn.addEventListener('click', toggleDarkMode)
notificationBtn.addEventListener('click', toggleNotification)
notificationCloseBtn.addEventListener('click', toggleNotification)
userPanelBtn.addEventListener('click', ToggleUserPanel)
menuBtn.addEventListener('click', ToggleMenu)
sidebarBtn.addEventListener('click', ToggleMenu)
blurEffectElem.addEventListener('click', () => {
    let isOpenUserPanel = userPanelWrapper.classList.contains('flex')
    if (isOpenUserPanel) {
        ToggleUserPanel()
    }

})



