//--------------------------------------------Variables
const $ = document
const userNameInput = $.querySelector('#user-name')
const emailInput = $.querySelector('#email-input')
const passwordInput = $.querySelector('#password')
const userNameWrapper = $.querySelector('#user-name-wrapper')
const emailWrapper = $.querySelector('#email-wrapper')
const passwordWrapper = $.querySelector('#password-wrapper')
const uppercaseElemCheckPass = $.querySelector('#uppercase')
const lowercaseElemCheckPass = $.querySelector('#lowercase')
const characterElemCheckPass = $.querySelector('#character')
const numberElemCheckPass = $.querySelector('#number')
const singupBtn = $.querySelector('#btn')
const rgxUserName = /^[A-Za-zآ-ی][A-Za-zآ-ی0-9 ]{0,49}$/;
const rgxEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const rgxPassUppercase = /(?:.*[A-Z])/;
const rgxPassLowercase = /(?:.*[a-z])/;
const rgxPassCharacter = /[!@#$%^&*(),.?":{}|<>]/;
const rgxPassNumber = /\d/;
let isPassCorrect = false
let isUserCorrect = false
let isEmailCorrect = false


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
    console.log('ok');

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



//--------------------------------------------Events
passwordInput.addEventListener('input', passwordCheckHandler)
passwordInput.addEventListener('blur', () => {
    inputHandler('pass')
})
userNameInput.addEventListener('input', userNameHandler)
userNameInput.addEventListener('blur', () => {
    inputHandler('user-name')
})
emailInput.addEventListener('input', emailHandler)
emailInput.addEventListener('blur', () => {
    inputHandler('email')
})

