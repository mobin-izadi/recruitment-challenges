import { logged } from "./utils.js";

//--------------------------------------------Variables
const offerWrapper = document.querySelector('.offer-wrapper')

//--------------------------------------------functions
// Type the offer text.
const typeOffer = () => {
    offerWrapper.innerHTML = ''
    let offerText = 'کد تخفیف 20 درصدی : mobin'
    let index = 0
    let typing = setInterval(() => {
        offerWrapper.innerHTML = ''
        let offer = offerText.slice(0, index)
        offerWrapper.innerHTML = offer
        index++
        if (index > offerText.length) {
            clearInterval(typing)
            setTimeout(() => {
                deleteType(offerText)
            }, 2000);

        }
    }, 200);

}
// delete the offer text.
const deleteType = (text) => {
    let index = text.length
    let typing = setInterval(() => {
        offerWrapper.innerHTML = ''
        let offer = text.slice(0, index)
        offerWrapper.innerHTML = offer
        index--
        if (index < 0) {
            clearInterval(typing)
            setTimeout(() => {
                typeOffer()
            }, 1000);

        }
    }, 200);
}

//--------------------------------------------events
window.addEventListener('load', () => {
    let isLogin = localStorage.getItem('isLogin') || 'false'
    if (isLogin === 'false') {
        window.location.href = 'login.html'
    }
    typeOffer()
})