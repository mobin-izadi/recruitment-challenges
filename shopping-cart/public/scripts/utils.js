//Check if the user is logged in and redirect them.
const logged = (address) => {
    let isLogin = localStorage.getItem('isLogin')
    if (isLogin === 'true') {
        window.location.href = address
    }
}

export { logged }