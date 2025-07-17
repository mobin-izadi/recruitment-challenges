const body = document.body
const loaderWrapper = document.querySelector('.loader-wrapper')



// functions
const removeLoader = () => {
    body.classList.remove('overflow-hidden')
    loaderWrapper.classList.add('hidden')
}





// events
window.addEventListener('load', () => {
    removeLoader()
})