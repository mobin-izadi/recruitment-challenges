//Check if the user is logged in and redirect them.
const logged = (address) => {
    let isLogin = localStorage.getItem('isLogin')
    if (isLogin === 'true') {
        window.location.href = address
    }
}
// Get all users information from local storage.
const getAllUsers = () => {
    let users = JSON.parse(localStorage.getItem('users')) || []
    return users
}
// all user name users
const allUserName = () => {
    let users = getAllUsers()
    let usernames = users.map(user => user.userName)
    return usernames

}
// all email users
const allEmail = () => {
    let users = getAllUsers()
    let userEmails = users.map(user => user.userEmail)
    return userEmails

}
export { logged, getAllUsers, allUserName, allEmail }