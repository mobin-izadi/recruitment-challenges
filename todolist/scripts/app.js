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
const taskWrapperMassageElem = document.querySelector('.task-wrapper-massage ')
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
const taskEditBtn = document.querySelector('.new-task__edit')
let idTaskEdit = null
let time = []
let timerId = {};
const todoCategoryBtn = document.querySelector('.todo-category')
const categoryItemBtn = document.querySelectorAll('.category__item span')
const todoPageTitle = document.querySelector('.task-title__name')
const todoPageCount = document.querySelector('.task-title__count')
let currentCategory = 'all';
const todoCategoryListBtn = document.querySelectorAll('.todo-category-list__item')
const filterItemBtn = document.querySelectorAll('.filter__item')
let sortFilter = null
let targetSortArr = []



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
const closeNewTaskWrapper = () => {
    newTaskWrapper.classList.remove('new-task-wrapper--show')
    newTaskWrapper.classList.remove('new-task-wrapper--edit')
    inputTaskTitle.value = ''
    inputTaskDescription.value = ''
    inputTaskCategory.value = 'اصلی'
    inputTaskDifficulty.value = '1'
}
const openNewTaskWrapper = () => {
    newTaskWrapper.classList.add('new-task-wrapper--show')

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
    value = JSON.stringify(value)
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

// timer
const timer = (id) => {
    let allTasks = getItemToLocalStorage('tasks');
    let indexTask = allTasks.findIndex(task => task.id == id);

    if (allTasks[indexTask]) {
        time[id] = allTasks[indexTask].time;
    } else {
        time[id] = 0;
    }

    timerId[id] = setInterval(() => {
        time[id]++;
        updateTimeTask(id, time[id])
        renderTasksByCurrentCategory()
    }, 1000);
};

const stopTimer = (id) => {
    if (timerId[id]) {
        clearInterval(timerId[id]);
    }

}

// update task
const updateTimeTask = (id, time) => {


    let allTasks = getItemToLocalStorage('tasks');
    let indexTask = allTasks.findIndex(task => task.id == id);

    if (indexTask !== -1) {
        allTasks[indexTask].time = time;
        saveToLocalStorage('tasks', allTasks);
        renderTasksByCurrentCategory();
    }
};




// add new task
const submitNewTaskHandler = () => {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let taskTitle = inputTaskTitle.value.trim();
    let taskDescription = inputTaskDescription.value.trim();
    let taskCate = inputTaskCategory.value;
    let taskDifficulty = inputTaskDifficulty.value;
    let date = new Date();
    let dateShamsi = new Intl.DateTimeFormat('fa-IR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(date);

    let newTask = null;

    if (taskTitle.length <= 0) {
        addNotific('عنوان نمی‌تواند خالی باشد');
    } else if (taskDescription.length > 70) {
        addNotific('توضیحات نمی‌تواند خیلی بلند باشد');
    } else {
        newTask = {
            id: crypto.randomUUID(),
            title: taskTitle,
            des: taskDescription,
            cate: taskCate,
            diff: taskDifficulty,
            date: dateShamsi,
            time: 0,
            create: now,
            isComplete: false,
        };

        tasks.push(newTask);
        saveToLocalStorage('tasks', tasks);
        resetNewTask();
        allTasks = getItemToLocalStorage('tasks');
        renderTasksByCurrentCategory();
    }
};
// Resets new task inputs.
const resetNewTask = () => {
    inputTaskTitle.value = ''
    inputTaskDescription.value = ''
    inputTaskCategory.selectedIndex = 0
    inputTaskDifficulty.selectedIndex = 0
}

// convert sec to hh:min:sec
function formatTime(totalSeconds) {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

// Creates task boxes.
const createTaskBoxes = (array) => {
    targetSortArr = array
    console.log(sortFilter);

    if (sortFilter === 'hard') {
        array = [...array].sort((a, b) => b.diff - a.diff);
    } else if (sortFilter === 'easy') {
        array = [...array].sort((a, b) => a.diff - b.diff);
    } else if (sortFilter === 'new') {
        array = [...array].sort((a, b) => new Date(b.create) - new Date(a.create));
    } else if (sortFilter === 'old') {
        array = [...array].sort((a, b) => new Date(a.create) - new Date(b.create)); // ✅ اصلاح شد
    }


    if (array.length > 0) {
        taskWrapperMassageElem.classList.add('hidden')
    } else {
        taskWrapperMassageElem.classList.remove('hidden')
    }

    taskWrapperElem.innerHTML = ''
    let star = ''
    let time = null
    array.forEach(task => {
        star = ''
        for (let index = 0; index < task.diff; index++) {
            star += `
            <svg>
         <use href="#star"></use>
         </svg>`
                ;

        }

        time = formatTime(task.time)
        taskWrapperElem.insertAdjacentHTML('beforeend', `
            
            <div class="task-box ${task.isComplete ? `task-box--done` : ''}">
                        <div class="task-box__category">
                          ${task.cate}  
                        </div>
                        <p class="task-box__title">   ${task.title} </p>
                        <p class="task-box__description">   ${task.des} </p>
                        <div class="task-box__info">
                            <div class="task-box__date">

                                <span>   ${task.date}  </span>
                            </div>
                            <div class="task-box__rate">
                                ${star}
                                
                            </div>

                        </div>
                        <div class="task-box__timer">
                            <div class="task-box__time-btns">
                                <button onclick="timer('${task.id}')" >${task.time > 0 ? 'ادامه' : 'شروع'}</button>
                                <button onclick="stopTimer('${task.id}')"> پایان</button>
                            </div>

                            <p class="task-box__time" id="task-${task.id}">${time}
                            </p>
                        </div>
                        <div class="task-box__detail">
                            <button class="task-box__done-btn" onclick="taskCompletionHandle('${task.id}')">${task.isComplete ? 'تمام شد' : 'کامل کن'}</button>
                            <div class="task-box__edit">
                                <button class="task-box__delete-btn" onclick="taskDeleteHandle('${task.id}')">
                                    <svg>
                                        <use href="#delete"></use>
                                    </svg>
                                </button>
                                <button class="task-box__edit-btn" onclick="taskEditHandle('${task.id}')">
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

// task edit
const taskEditHandle = (id) => {
    newTaskWrapper.classList.add('new-task-wrapper--edit')
    let allTask = getItemToLocalStorage('tasks')
    let targetTask = allTask.find(task => task.id == id)
    inputTaskTitle.value = targetTask.title
    inputTaskDescription.value = targetTask.des
    inputTaskCategory.value = targetTask.cate
    inputTaskDifficulty.value = targetTask.diff
    idTaskEdit = id

}

// task delete handler
const taskDeleteHandle = (id) => {
    let allTask = getItemToLocalStorage('tasks')
    let tasksFilter = allTask.filter(task => task.id != id)
    saveToLocalStorage('tasks', tasksFilter)
    createTaskBoxes(tasksFilter)

}


// delete all data local
const localStorageClear = () => {
    localStorage.clear()
    location.reload()
}

// create categoies elem
const createCategoies = () => {
    todoCategoryList.innerHTML = '<li class="todo-category-list__item" onclick="filterTodoCate(this)" data-cate="اصلی">اصلی</li > '
    inputTaskCategory.innerHTML = `<option value="اصلی">اصلی</option>`
    let allCategories = getItemToLocalStorage('categories') || []
    if (allCategories.length > 0) {
        allCategories.forEach(cate => {
            todoCategoryList.insertAdjacentHTML('beforeend', `
                <li class="todo-category-list__item" onclick="filterTodoCate(this)" data-cate="${cate}">
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

// filter category todo
const filterTodoCate = (elem) => {
    currentCategory = elem.dataset.cate;
    let allTodos = getItemToLocalStorage('tasks');
    let filteredTodos = [];
    removeActiveStyleCategory();
    todoPageTitle.innerHTML = elem.textContent;
    filteredTodos = allTodos.filter(task => task.cate == currentCategory)
    createTaskBoxes(filteredTodos);
    todoPageCount.innerHTML = filteredTodos.length;
}

// Task completion handle
const taskCompletionHandle = (id) => {
    let allTask = getItemToLocalStorage('tasks')
    let indexTaskTarget = allTask.findIndex(task => task.id == id)
    allTask[indexTaskTarget].isComplete = !allTask[indexTaskTarget].isComplete
    saveToLocalStorage('tasks', allTask)
    createTaskBoxes(allTask)



}

// Delete the active style from the Todo category menu
const removeActiveStyleCategory = () => {
    categoryItemBtn.forEach(btn => {
        btn.parentElement.classList.remove('category__item--active')
    })

}

// filter category todo
const filterCategoryTodo = (elem) => {
    currentCategory = elem.dataset.category;
    let allTodos = getItemToLocalStorage('tasks');
    let filteredTodos = [];

    removeActiveStyleCategory();
    elem.parentElement.classList.add('category__item--active');
    todoPageTitle.innerHTML = elem.textContent;

    if (currentCategory === 'all') {
        filteredTodos = allTodos;
    } else if (currentCategory === 'doing') {
        filteredTodos = allTodos.filter(todo => todo.time > 0 && !todo.isComplete);
    } else if (currentCategory === 'end') {
        filteredTodos = allTodos.filter(todo => todo.isComplete);
    }

    createTaskBoxes(filteredTodos);
    todoPageCount.innerHTML = filteredTodos.length;
}

const renderTasksByCurrentCategory = () => {
    const allTasks = getItemToLocalStorage('tasks');
    let filtered = [];
    if (currentCategory === 'all') {
        filtered = allTasks;
    } else if (currentCategory === 'doing') {
        filtered = allTasks.filter(todo => todo.time > 0);
    } else if (currentCategory === 'end') {
        filtered = allTasks.filter(todo => todo.isComplete);
    } else {
        filtered = allTasks.filter(todo => todo.cate == currentCategory);
    }
    console.log(filtered);

    createTaskBoxes(filtered);
    todoPageCount.innerHTML = filtered.length;
};

// filter todo
const sortTodo = (elem) => {

    sortFilter = elem.dataset.sort
    createTaskBoxes(targetSortArr)
}

categoryItemBtn.forEach(btn => {
    btn.addEventListener('click', event => {
        filterCategoryTodo(event.target)
    })

})

filterItemBtn.forEach(btn => {
    btn.addEventListener('click', event => {
        sortTodo(event.target)
    })
})
// events
taskEditBtn.addEventListener('click', () => {
    console.log(idTaskEdit);
    let allTask = getItemToLocalStorage('tasks')
    let indexTask = allTask.findIndex(task => task.id == idTaskEdit)
    allTask[indexTask].title = inputTaskTitle.value
    allTask[indexTask].des = inputTaskDescription.value
    allTask[indexTask].cate = inputTaskCategory.value
    allTask[indexTask].diff = inputTaskDifficulty.value
    saveToLocalStorage('tasks', allTask)
    createTaskBoxes(allTask)
    closeNewTaskWrapper()

})

window.addEventListener('load', () => {
    createCategoies()
    allTasks = getItemToLocalStorage('tasks') || []
    todoPageCount.innerHTML = allTasks.length
    if (allTasks.length > 0) {
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
    openNewTaskWrapper()
})
newTaskBtn.addEventListener('click', () => {
    openNewTaskWrapper()
})
newTaskCloseBtn.addEventListener('click', () => {
    closeNewTaskWrapper()
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
    if (newCategoryInput.value.trim()) {
        allCategories.push(newCategoryInput.value)
        saveToLocalStorage('categories', allCategories)

        createCategoies()
        newCategoryInput.value = ''
    } else {
        addNotific('نام دسته بندی حتما باید شامل حرف یا عدد باشد')
    }


})

todoCategoryBtn.addEventListener('click', () => {
    todoCategoryList.classList.toggle('todo-category-list--show')
    todoCategoryBtn.classList.toggle('todo-category--active')

})

