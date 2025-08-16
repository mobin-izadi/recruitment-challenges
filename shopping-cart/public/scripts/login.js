import { logged, getAllUsers } from "./utils.js"
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
// Check if the user information is correct. If it is correct, redirect them to the home page.
const loginHandler = (event) => {
    event.preventDefault()
    let users = getAllUsers()
    let userName = userNameInput.value.trim()
    let passUser = passwordInput.value.trim()
    let findUser = users.find(user => user.userName.toLowerCase() === userName.toLowerCase() && user.UserPass === passUser)
    if (findUser) {

        localStorage.setItem('isLogin', true);
        localStorage.setItem('user', JSON.stringify(findUser))
        massage(true, `${findUser.name} عزیز خوش آمدی 😊❤️`)
        setTimeout(() => {
            window.location.href = '../index.html'
        }, 2000);
    } else {
        massage(false, 'نام کاربری یا پسورد اشتباه می باشد')
    }

}

//--------------------------------------------Events
window.addEventListener('load', () => {
    logged('../index.html')
})

showPassBtn.addEventListener('click', showPassHandler)
loginBtn.addEventListener('click', event => {
    loginHandler(event)
})
