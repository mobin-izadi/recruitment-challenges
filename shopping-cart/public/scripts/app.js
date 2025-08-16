import { removeLoadgin, isLoginUser, getUserInfo } from "./utils.js"
//--------------------------------------------Variables
const darkModeBtn = document.querySelector('#dark-mode-btn')
const loginBtn = document.querySelector('.login-btn')
const panelUserBtnWrapper = document.querySelector('.panel-user-btn-wrapper')
const panelUserBtn = document.querySelector('.panel-user-btn')
const panelUserName = document.querySelector('#panel-user-name')
const logOutBtn = document.querySelector('.log-out-btn')
const userPanelWrapper = document.querySelector('.user-panel-wrapper')
const blurEffect = document.querySelector('.blur-effect')
const cartWrapper = document.querySelector('.cart-wrapper')
const cartBtn = document.querySelector('.cart-btn')
const cartListWrapper = document.querySelector('.cart-list-wrapper')
const searchMobileBtnWrapper = document.querySelector('.search-mobile-btn-wrapper')
const searchMobileBtn = document.querySelector('.search-mobile-btn')
const searchMobileWrapper = document.querySelector('.search-mobile-wrapper')
const searchMobileClsoeBtn = document.querySelector('.search-mobile-close-btn')
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
// Checks if the user is logged in and fills all fields with user information.
const createPageHandler = () => {
    let isLogin = isLoginUser()
    if (isLogin) {
        let user = getUserInfo()
        panelUserName.innerHTML = user.name
        panelUserBtnWrapper.classList.remove('hidden')
        loginBtn.classList.add('hidden')
    } else {
        panelUserBtnWrapper.classList.add('hidden')
        loginBtn.classList.remove('hidden')

    }
}
// Logs out the user.
const logoutHandler = () => {
    localStorage.setItem('isLogin', false)
    localStorage.setItem('user', JSON.stringify({}))
    window.location.reload()

}
// The user opens and closes the panel.
const userPanelHandler = (action) => {

    if (action === 'open') {
        panelUserBtnWrapper.classList.add('z-40')
        blurEffect.classList.remove('hidden')
        userPanelWrapper.classList.remove('hidden')
    } else {
        panelUserBtnWrapper.classList.remove('z-40')
        blurEffect.classList.add('hidden')
        userPanelWrapper.classList.add('hidden')
    }
}
// Opens and closes the shopping cart.
const cartPanelHandler = (action) => {

    if (action === 'open') {
        cartWrapper.classList.add('z-40')
        blurEffect.classList.remove('hidden')
        cartListWrapper.classList.remove('hidden')
    } else {
        cartWrapper.classList.remove('z-40')
        blurEffect.classList.add('hidden')
        cartListWrapper.classList.add('hidden')
    }
}
//  Opens and closes the search mobile Wrapper
const searchMobileHandler = (action) => {
    console.log(action);

    if (action === 'open') {
        blurEffect.classList.remove('hidden')
        searchMobileWrapper.classList.remove('hidden')
    } else {
        blurEffect.classList.add('hidden')
        searchMobileWrapper.classList.add('hidden')
    }
}
//--------------------------------------------Events
window.addEventListener('load', () => {
    createPageHandler()
    removeLoadgin()
})
darkModeBtn.addEventListener('click', darkModeStatusHandler)
logOutBtn.addEventListener('click', logoutHandler)
panelUserBtn.addEventListener('click', () => {
    userPanelHandler('open')
})
blurEffect.addEventListener('click', () => {
    userPanelHandler('close')
})

cartBtn.addEventListener('click', () => {
    cartPanelHandler('open')
})
blurEffect.addEventListener('click', () => {
    cartPanelHandler('close')
})
searchMobileBtn.addEventListener('click', () => {
    searchMobileHandler('open')
})
searchMobileClsoeBtn.addEventListener('click', () => {
    searchMobileHandler('close')
})

