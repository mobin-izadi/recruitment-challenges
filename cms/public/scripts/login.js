import { darkModeHandler, showVpnActivation } from "./utils.js"


//--------------------------------------------Variables
const userNameInput = document.getElementById('user-name')
const passwordInput = document.getElementById('password')
const loginBtn = document.getElementById('login-btn')
const showPassBtn = document.getElementById('pass-show-btn')
const passShowIcon = showPassBtn.querySelector('use')
let iconPass = "eye-off"
//--------------------------------------------Functions
// Handle showing and hiding the password.
const showPassHandler = () => {
    if (iconPass === 'eye-off') {
        passwordInput.setAttribute('type', 'text')
        passShowIcon.setAttribute('href', '#eye')
        iconPass = "eye"
    } else {
        passwordInput.setAttribute('type', 'password')
        passShowIcon.setAttribute('href', '#eye-off')
        iconPass = "eye-off"
    }
    iconPass = passShowIcon.href.animVal.slice(1)
}

// Enter the information before the page loads.
const pageLoadingHandler = () => {
    darkModeHandler()
    showVpnActivation()
}

//--------------------------------------------Events
window.addEventListener('load', pageLoadingHandler)

showPassBtn.addEventListener('click', showPassHandler)

