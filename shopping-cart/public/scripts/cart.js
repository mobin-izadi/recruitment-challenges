import { logged } from "./utils.js";

//--------------------------------------------Variables

//--------------------------------------------functions

//--------------------------------------------events
window.addEventListener('load', () => {
    let isLogin = localStorage.getItem('isLogin') || 'false'
    if (isLogin === 'false') {
        window.location.href = 'login.html'
    }
})