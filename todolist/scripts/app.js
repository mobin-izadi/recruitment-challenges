const body = document.body
const loaderWrapper = document.querySelector('.loader-wrapper')
const mobileMenuBtn = document.querySelector('.mobile-menu-btn')
const mobileMenuWrapper = document.querySelector('.sidebar')
const mobileMenuCloseBtn = document.querySelector('.sidebar__close-btn')
const newTaskWrapper = document.querySelector('.new-task-wrapper')
const newTaskSidebarBtn = document.querySelector('.sidebar__btn')
const newTaskBtn = document.querySelector('.task-btn')
const newTaskCloseBtn = document.querySelector('.new-task__close-btn')



// functions
const removeLoader = () => {
    body.classList.remove('overflow-hidden')
    loaderWrapper.classList.add('hidden')
}

const toggleMobileMenu = () => {
    mobileMenuWrapper.classList.toggle('sidebar--show')
}

const toggleNewTaskWrapper = () => {
    newTaskWrapper.classList.toggle('new-task-wrapper--show')
}





// events
window.addEventListener('load', () => {
    removeLoader()
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