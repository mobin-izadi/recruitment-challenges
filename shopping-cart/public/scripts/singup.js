import { logged, allUserName, allEmail } from "./utils.js"
//--------------------------------------------Variables
const userNameInput = document.querySelector('#user-name')
const emailInput = document.querySelector('#email-input')
const passwordInput = document.querySelector('#password')
const userNameWrapper = document.querySelector('#user-name-wrapper')
const emailWrapper = document.querySelector('#email-wrapper')
const passwordWrapper = document.querySelector('#password-wrapper')
const uppercaseElemCheckPass = document.querySelector('#uppercase')
const lowercaseElemCheckPass = document.querySelector('#lowercase')
const characterElemCheckPass = document.querySelector('#character')
const numberElemCheckPass = document.querySelector('#number')
const singupBtn = document.querySelector('#singup-btn')
const rgxUserName = /^[A-Za-zآ-ی][A-Za-zآ-ی0-9 ]{0,49}$/;
const rgxEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const rgxPassUppercase = /(?:.*[A-Z])/;
const rgxPassLowercase = /(?:.*[a-z])/;
const rgxPassCharacter = /[!@#$%^&*(),.?":{}|<>]/;
const rgxPassNumber = /\d/;
let isPassCorrect = false
let isUserCorrect = false
let isEmailCorrect = false
let userNameList = allUserName() || []
let userEmailList = allEmail() || []


//--------------------------------------------Functions
// Check if the password contains uppercase and lowercase letters, numbers, and characters
const passwordCheckHandler = () => {

    if (rgxPassUppercase.test(passwordInput.value)) {
        uppercaseElemCheckPass.classList.add('text-green-500')
        isPassCorrect = true
    } else {
        uppercaseElemCheckPass.classList.remove('text-green-500')
        isPassCorrect = false
    }

    if (rgxPassLowercase.test(passwordInput.value)) {
        lowercaseElemCheckPass.classList.add('text-green-500')
        isPassCorrect = true
    } else {
        lowercaseElemCheckPass.classList.remove('text-green-500')
        isPassCorrect = false
    }

    if (rgxPassCharacter.test(passwordInput.value)) {
        characterElemCheckPass.classList.add('text-green-500')
        isPassCorrect = true
    } else {
        characterElemCheckPass.classList.remove('text-green-500')
        isPassCorrect = false
    }

    if (rgxPassNumber.test(passwordInput.value)) {
        numberElemCheckPass.classList.add('text-green-500')
        isPassCorrect = true
    } else {
        numberElemCheckPass.classList.remove('text-green-500')
        isPassCorrect = false
    }

}
// Check if the username is correct.
const userNameHandler = () => {

    if (rgxUserName.test(userNameInput.value)) {
        isUserCorrect = true
    } else {
        isUserCorrect = false
    }


}
// Check if the email is correct.
const emailHandler = () => {
    if (rgxEmail.test(emailInput.value)) {
        isEmailCorrect = true
    } else {
        isEmailCorrect = false
    }
}
// Check if the input is correct, make the border green
const inputHandler = (inputName) => {
    if (inputName === 'pass') {
        if (isPassCorrect) {
            passwordWrapper.classList.add('!border-green-500');
        } else {
            passwordWrapper.classList.remove('!border-green-500');
        }
    }

    if (inputName === 'user-name') {

        if (isUserCorrect) {
            userNameWrapper.classList.add('!border-green-500');
        } else {
            userNameWrapper.classList.remove('!border-green-500');
        }
    }

    if (inputName === 'email') {
        if (isEmailCorrect) {
            emailWrapper.classList.add('!border-green-500');
        } else {
            emailWrapper.classList.remove('!border-green-500');
        }
    }
}
// Register a new user and redirect them to the home page.
const registration = (event) => {
    event.preventDefault()

    if (isPassCorrect && isUserCorrect && isEmailCorrect) {
        let userId = crypto.randomUUID();
        let userName = userNameInput.value.trim();
        let userEmail = emailInput.value.trim();
        let UserPass = passwordInput.value.trim();
        let newUser = {
            userId,
            userName,
            userEmail,
            UserPass
        }

        let users = JSON.parse(localStorage.getItem('users')) || []
        users.push(newUser)
        localStorage.setItem('users', JSON.stringify(users))
        localStorage.setItem('isLogin', true)
        massage(true, 'ثبت نام شما با موفقیت انجام شد')
        setTimeout(() => {
            window.location.href = '../index.html'
        }, 3000);

    } else if (!isPassCorrect) {
        massage(false, 'لطفا پسورد را مطابق الگو انتخاب کنید')
    } else if (!isUserCorrect) {
        massage(false, 'نام کاربری نمیتواند شامل کارکتر ها باشد و حداکثر تعداد حروف 49  می باشد')
    } else if (!isEmailCorrect) {
        massage(false, 'لطفا ایمیل را به صورت درست وارد کنید')
    }

}



//--------------------------------------------Events
window.addEventListener('load', () => {
    logged('../index.html')
})
passwordInput.addEventListener('input', passwordCheckHandler)
passwordInput.addEventListener('blur', () => {
    inputHandler('pass')
})
userNameInput.addEventListener('input', userNameHandler)
userNameInput.addEventListener('blur', () => {

    let isUserNameInDatabase = userNameList.some(username => username.trim().toLowerCase() == userNameInput.value.trim().toLowerCase())
    if (isUserNameInDatabase) {
        massage(false, 'این نام کاربری قبلا ثبت شده است.')
        isUserCorrect = false
    }
    inputHandler('user-name')



})
emailInput.addEventListener('input', emailHandler)
emailInput.addEventListener('blur', () => {
    let isEmailInDatabase = userEmailList.some(email => email.trim().toLowerCase() == emailInput.value.trim().toLowerCase())
    if (isEmailInDatabase) {
        massage(false, 'این ایمیل قبلا ثبت شده است.')
        isEmailCorrect = false
    }
    inputHandler('email')
})
singupBtn.addEventListener('click', event => registration(event))


