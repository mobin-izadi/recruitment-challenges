//--------------------------------------------Variables

const massageWrapper = document.querySelector('.massage-wrapper')
let notific = null
let indexMassage = 0
let theme = null


//--------------------------------------------Functions
// Create a new message.
const massage = (type, msg) => {
    ++indexMassage
    if (type) {
        notific = `
        <div class="bg-white dark:bg-gray-700 dark:text-white  rounded-xl shadow p-2 w-96 min-h-32 border border-green-500" id="${indexMassage}">
            <svg class="w-6 h-6 cursor-pointer transition-all hover:text-green-500 dark:hover:text-blue-500" onclick="removeMassage(${indexMassage},true)">
                <use href="#close"></use>
            </svg>
            <div class="flex justify-center">
                <svg class="h-10 w-10 text-green-500" fill="currentColor" version="1.1" id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"
                    xml:space="preserve">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <g>
                            <g>
                                <path
                                    d="M256,0C114.837,0,0,114.843,0,256s114.837,256,256,256s256-114.843,256-256S397.163,0,256,0z M376.239,227.501 L257.348,346.391c-13.043,13.043-34.174,13.044-47.218,0l-68.804-68.804c-13.044-13.038-13.044-34.179,0-47.218 c13.044-13.044,34.174-13.044,47.218,0l45.195,45.19l95.282-95.278c13.044-13.044,34.174-13.044,47.218,0 C389.283,193.321,389.283,214.462,376.239,227.501z">
                                </path>
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
            <p class="my-2 text-sm leading-6 font-light">
             ${msg}
            </p>
        </div>
        `

    } else {
        notific = `
        
        <div class="bg-white dark:bg-gray-700 dark:text-white  rounded-xl shadow p-2 w-96 min-h-32 border border-red-500" id="${indexMassage}">
            <svg class="w-6 h-6 cursor-pointer transition-all hover:text-green-500 dark:hover:text-blue-500" onclick="removeMassage(${indexMassage},true)">
                <use href="#close"></use>
            </svg>
            <div class="flex justify-center">
                <svg class="w-12 h-12 text-red-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path
                            d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM15.36 14.3C15.65 14.59 15.65 15.07 15.36 15.36C15.21 15.51 15.02 15.58 14.83 15.58C14.64 15.58 14.45 15.51 14.3 15.36L12 13.06L9.7 15.36C9.55 15.51 9.36 15.58 9.17 15.58C8.98 15.58 8.79 15.51 8.64 15.36C8.35 15.07 8.35 14.59 8.64 14.3L10.94 12L8.64 9.7C8.35 9.41 8.35 8.93 8.64 8.64C8.93 8.35 9.41 8.35 9.7 8.64L12 10.94L14.3 8.64C14.59 8.35 15.07 8.35 15.36 8.64C15.65 8.93 15.65 9.41 15.36 9.7L13.06 12L15.36 14.3Z"
                            fill="currentColor"></path>
                    </g>
                </svg>
            </div>
            <p class="my-2 text-sm leading-6 font-light">
                  ${msg}
            </p>
        </div>
        `
    }

    massageWrapper.insertAdjacentHTML('beforeend', notific)
    removeMassage(indexMassage)

}
// Delete messages after three seconds. If you click on a message, don't delete it.
const removeMassage = (id, btn) => {

    if (btn) {
        document.getElementById(id).remove()
    } else {
        let timer = setTimeout(() => {
            if (document.getElementById(id)) {
                document.getElementById(id).remove();
            }
        }, 3000);

        document.getElementById(id).addEventListener('mouseenter', () => clearTimeout(timer))
        document.getElementById(id).addEventListener('mouseleave', () => removeMassage(id))
    }


}
//Check local storage, if it is dark, enable dark.
const darkModeHandler = () => {
    theme = localStorage.getItem('theme') || 'light'
    console.log(theme);

    if (theme === 'dark') {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }

}
//--------------------------------------------Events
window.addEventListener('load', () => {
    darkModeHandler()
})