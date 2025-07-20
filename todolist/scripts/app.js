

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
const taskWrapperMassageElem = document.querySelector('.task-wrapper__massage ')
const darkModeBtn = document.querySelector('#darkmode-check')
const taskShowGridBtn = document.querySelector('.view__grid')
const taskShowListBtn = document.querySelector('.view__list')
const inputTaskTitle = document.querySelector('#task-title')
const inputTaskDescription = document.querySelector('#task-description')
const inputTaskCategory = document.querySelector('#cate-task')
const inputTaskDifficulty = document.querySelector('#task-difficulty')
const submitNewTaskBtn = document.querySelector('.new-task__submit')
const resetNewTaskBtn = document.querySelector('.new-task__rest-btn')
let allTasks = null
const deleteDataBtn = document.querySelector('.delete-data__btn')
const notificWrapper = document.querySelector('.notific-wrapper')
const newCategoryBtn = document.querySelector('#new-category-btn')
const categoryWrapperElm = document.querySelector('.category-wrapper')
const categoryWrapperClsoeBtn = document.querySelector('.new-category__close-btn')
const newCategoryInput = document.querySelector('.new-category__input')
const addNewCategoryBtn = document.querySelector('.new-category__btn')
const todoCategoryList = document.querySelector('.todo-category-list')




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
// get LocalStorage
const getItemToLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(`${key}`))
}

// new notific
const addNotific = (massage) => {
    notificWrapper.insertAdjacentHTML('beforeend', `
         <div class="notific">
            <svg class='notific__close-btn'>
                <use href="#close"></use>
            </svg>

            <span class="notific__massage">${massage}</span>
        </div>
        
        `)

    setTimeout(() => {
        autoRemoveNotific(massage)
    }, 3000);

}

const autoRemoveNotific = (massage) => {
    let allNotifices = document.querySelectorAll('.notific__massage')
    allNotifices.forEach(elem => {
        if (elem.innerHTML == massage) {
            elem.parentElement.remove()
        }
    })
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

        addNotific('عنوان نمی تواند خالی باشد');
    } else if (taskDescription.length > 70) {
        addNotific('توضیحات نمی تواند خیلی بلند باشد')

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
        allTasks = getItemToLocalStorage('tasks')
        createTaskBoxes(allTasks)
    }

}
// Resets new task inputs.
const resetNewTask = () => {
    inputTaskTitle.value = ''
    inputTaskDescription.value = ''
    inputTaskCategory.selectedIndex = 0
    inputTaskDifficulty.selectedIndex = 0
}

// Creates task boxes.
const createTaskBoxes = (array) => {
    taskWrapperElem.innerHTML = ''
    let star = ''
    array.forEach(arr => {
        star = ''
        for (let index = 0; index < arr.diff; index++) {
            star += `
            <svg>
         <use href="#star"></use>
         </svg>`
                ;

        }
        taskWrapperElem.insertAdjacentHTML('beforeend', `
            
            <div class="task-box">
                        <div class="task-box__category">
                          ${arr.cate}  
                        </div>
                        <p class="task-box__title">   ${arr.title} </p>
                        <p class="task-box__description">   ${arr.des} </p>
                        <div class="task-box__info">
                            <div class="task-box__date">

                                <span>   ${arr.date}  </span>
                            </div>
                            <div class="task-box__rate">
                                ${star}
                                
                            </div>

                        </div>
                        <div class="task-box__timer">
                            <div class="task-box__time-btns">
                                <button>شروع</button>
                                <button>پایان</button>
                            </div>

                            <p class="task-box__time">00:00:00
                            </p>
                        </div>
                        <div class="task-box__detail">
                            <button class="task-box__done-btn">${arr.isComplete ? 'انجام شد' : 'تکمیل'}</button>
                            <div class="task-box__edit">
                                <button>
                                    <svg>
                                        <use href="#delete"></use>
                                    </svg>
                                </button>
                                <button>
                                    <svg>
                                        <use href="#edit"></use>
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>
            
            `)
    })
}
// delete all data local
const localStorageClear = () => {
    localStorage.clear()
    location.reload()
}

// create categoies elem
const createCategoies = () => {
    todoCategoryList.innerHTML = '<li class="todo-category-list__item">اصلی</li > '
    inputTaskCategory.innerHTML = `<option value="اصلی">اصلی</option>`
    let allCategories = getItemToLocalStorage('categories') || []
    if (allCategories.length > 0) {
        allCategories.forEach(cate => {
            todoCategoryList.insertAdjacentHTML('beforeend', `
                <li class="todo-category-list__item">
                        ${cate}
                    </li>
                `)

            inputTaskCategory.insertAdjacentHTML('beforeend', `
                <option value="${cate}">
                        ${cate}
                    </option>
                `)
        })



    }
}



// events
window.addEventListener('load', () => {
    createCategoies()
    allTasks = getItemToLocalStorage('tasks')
    if (allTasks) {
        taskWrapperMassageElem.classList.add('hidden')
        createTaskBoxes(allTasks)
    } else {
        taskWrapperMassageElem.classList.remove('hidden')
    }


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

deleteDataBtn.addEventListener('click', localStorageClear)

notificWrapper.addEventListener('click', event => {

    let targenElem = event.target
    if (targenElem.className.animVal === 'notific__close-btn') {
        targenElem.parentElement.remove()

    }

})

newCategoryBtn.addEventListener('click', () => {
    categoryWrapperElm.classList.add('category-wrapper--show')
})
categoryWrapperClsoeBtn.addEventListener('click', () => {
    categoryWrapperElm.classList.remove('category-wrapper--show')
})
addNewCategoryBtn.addEventListener('click', () => {


    let allCategories = getItemToLocalStorage('categories') || []

    allCategories.push(newCategoryInput.value)
    let arrToString = JSON.stringify(allCategories)
    saveToLocalStorage('categories', `${arrToString}`)

    createCategoies()
    newCategoryInput.value = ''

})