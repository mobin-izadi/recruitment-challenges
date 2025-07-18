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
const taskWrapperElem = document.querySelector('.task-wrapper ')
const darkModeBtn = document.querySelector('#darkmode-check')
const taskShowGridBtn = document.querySelector('.view__grid')
const taskShowListBtn = document.querySelector('.view__list')
const inputTaskTitle = document.querySelector('#task-title')
const inputTaskDescription = document.querySelector('#task-description')
const inputTaskCategory = document.querySelector('#cate-task')
const inputTaskDifficulty = document.querySelector('#task-difficulty')
const submitNewTaskBtn = document.querySelector('.new-task__submit')
const resetNewTaskBtn = document.querySelector('.new-task__rest-btn')



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

// dark mode
const darkModeHandler = () => {

    if (darkModeBtn.checked) {
        body.classList.add('dark')
        localStorage.setItem('theme', 'dark')
    } else {
        body.classList.remove('dark')
        localStorage.setItem('theme', 'light')
    }
}
// check theme
const isDark = () => {
    let theme = localStorage.getItem('theme')
    if (theme === 'dark') {
        darkModeBtn.checked = true
        darkModeHandler()
    } else {
        darkModeBtn.checked = false
    }
}

// add to LocalStorage
const saveToLocalStorage = (key, value) => {
    localStorage.setItem(`${key}`, `${value}`)
}

// add new task
const submitNewTaskHandler = () => {

    let tasks = JSON.parse(localStorage.getItem('tasks')) || []
    let taskTitle = inputTaskTitle.value.trim()
    let taskDescription = inputTaskDescription.value.trim()
    let taskCate = inputTaskCategory.value
    let taskDifficulty = inputTaskDifficulty.value
    let date = new Date()
    let dateShamsi = new Intl.DateTimeFormat('fa-IR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(date)


    let newTask = null
    if (taskTitle.length <= 0) {
        alert('عنوان نمی تواند خالی باشد');
    } else if (taskDescription.length > 70) {
        alert('توضیحات نمی تواند خیلی بلند باشد')
    } else {
        newTask = {
            id: tasks.length,
            title: taskTitle,
            des: taskDescription,
            cate: taskCate,
            diff: taskDifficulty,
            date: dateShamsi,
            time: 0,
            create: now,
            isComplete: false,
        }

        tasks.push(newTask)
        saveToLocalStorage('tasks', JSON.stringify(tasks))
        resetNewTask()
    }

}
// Resets new task inputs.
const resetNewTask = () => {
    inputTaskTitle.value = ''
    inputTaskDescription.value = ''
    inputTaskCategory.selectedIndex = 0
    inputTaskDifficulty.selectedIndex = 0
}




// events
window.addEventListener('load', () => {
    isDark()
    showDateNow()
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

darkModeBtn.addEventListener('click', () => {
    darkModeHandler()
})

taskShowGridBtn.addEventListener('click', () => {
    console.log('grid');

    taskWrapperElem.classList.remove('task-wrapper--list')
})
taskShowListBtn.addEventListener('click', () => {
    console.log('list');

    taskWrapperElem.classList.add('task-wrapper--list')
})

resetNewTaskBtn.addEventListener('click', () => {
    resetNewTask()
})

submitNewTaskBtn.addEventListener('click', event => {

    event.preventDefault()
    submitNewTaskHandler()
})