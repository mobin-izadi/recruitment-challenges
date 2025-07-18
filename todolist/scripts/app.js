const body = document.body
const loaderWrapper = document.querySelector('.loader-wrapper')
const mobileMenuBtn = document.querySelector('.mobile-menu-btn')
const mobileMenuWrapper = document.querySelector('.sidebar')
const mobileMenuCloseBtn = document.querySelector('.sidebar__close-btn')
const newTaskWrapper = document.querySelector('.new-task-wrapper')
const newTaskSidebarBtn = document.querySelector('.sidebar__btn')
const newTaskBtn = document.querySelector('.task-btn')
const newTaskCloseBtn = document.querySelector('.new-task__close-btn')
const now = new Date()
const dateElm = document.querySelector('.date')



// functions
// The loader clears the screen.
const removeLoader = () => {
    body.classList.remove('overflow-hidden')
    loaderWrapper.classList.add('hidden')
}

//Opens and closes the mobile menu.
const toggleMobileMenu = () => {
    mobileMenuWrapper.classList.toggle('sidebar--show')
}

// Opens a new task section.
const toggleNewTaskWrapper = () => {
    newTaskWrapper.classList.toggle('new-task-wrapper--show')
}

// Show today's date at the top of the page.
const showDateNow = () => {
    const nowShamsi = new Intl.DateTimeFormat('fa-IR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(now)
    dateElm.innerHTML = nowShamsi

}





// events
window.addEventListener('load', () => {
    removeLoader()
    showDateNow()

})

mobileMenuBtn.addEventListener('click', () => {
    toggleMobileMenu()
})
mobileMenuCloseBtn.addEventListener('click', () => {
    toggleMobileMenu()
})

newTaskSidebarBtn.addEventListener('click', () => {
    toggleNewTaskWrapper()
})
newTaskBtn.addEventListener('click', () => {
    toggleNewTaskWrapper()
})
newTaskCloseBtn.addEventListener('click', () => {
    toggleNewTaskWrapper()
})