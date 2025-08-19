import { removeLoadgin, products } from "./utils.js";


let swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 15,
    freeMode: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },

    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        640: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 4,
        },
    }

});

//--------------------------------------------Variables
const offerWrapper = document.querySelector('.offer-wrapper')
const swiperEl = document.querySelector('.mySwiper')
const offerInputWrapper = document.querySelector('.offer-input-wrapper')
const inputOffer = document.querySelector('.input-offer')
const submitOffer = document.querySelector('.submit-offer')
const offerAmountElem = document.querySelector('#offer-amount')
const cartItemsWrapper = document.querySelector('.cart-items-wrapper')
const offerBtn = document.querySelector('.offer-btn')
const nameInput = document.querySelector('#name-input')
const totalAmountElem = document.querySelector('#total-amount')
const swiperWrapper = document.querySelector('.swiper-wrapper')
const sumPrice = document.querySelector('#sum-price')
const payBtn = document.querySelector('#pay-btn')
const factureBtn = document.querySelector('.facture-btn')
let user = JSON.parse(localStorage.getItem('user'))
let allPrice = 0
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
// Open and close the offer section.
const showOfferWrapper = () => {
    offerInputWrapper.classList.toggle('hidden')
    offerBtn.classList.toggle('rotate-180')
}

// Check, we have the product in stock.
const isStock = (stock, count) => {
    if (stock < Number(count)) {
        massage(false, 'درخواست محصول بیشتر از موجودی انبار می باشد')
        return false
    } else {
        return true
    }

}
// Add shopping cart to local storage
const addToCart = (id, count) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    let findProduct = products.find(product => product.id == id)
    let isProductInCart = cart.findIndex(product => product.id == findProduct.id)
    let isBuy = true

    if (count) {
        isBuy = isStock(findProduct.stock, count)
        if (isBuy) {
            cart[isProductInCart].count = count
        }

    } else {

        if (isProductInCart > -1) {
            let count = Number(cart[isProductInCart].count) + 1
            isBuy = isStock(findProduct.stock, count)
            if (isBuy) {
                cart[isProductInCart].count = Number(cart[isProductInCart].count) + 1

            }

        } else {
            isBuy = isStock(findProduct.stock, 1)
            if (isBuy) {
                findProduct.count = 1
                cart.push(findProduct)
            }

        }

    }



    localStorage.setItem('cart', JSON.stringify(cart))
    updateCart()


}
window.addToCart = addToCart

// Update your shopping cart.
const updateCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || []

    cartItemsWrapper.innerHTML = ''
    if (cart.length) {
        cart.forEach(product => {
            cartItemsWrapper.insertAdjacentHTML('beforeend', `
                <li class="flex items-center justify-between gap-1">
                <div class="flex items-center gap-2">
                <img src="../${product.image}" class="size-20 sm:size-24 object-contain ">
                                <div>
                                    <p class="line-clamp-2 text-sm sm:text-base max-w-72"> ${product.title}</p>
                                    <p class="line-clamp-1 text-sm text-gray-500 my-1"> ${product.price.toLocaleString('fa-ir')}
                                        <span>تومان</span>
                                    </p>
                                </div>
                </div>
                                <div class="flex items-center gap-2">
                                 <div class="bg-gray-100 dark:bg-gray-600 w-12  rounded p-0 relative">
                                   <input type="number" class="w-full h-full text-center " min="1"
                                            max="200" value="${product.count}" onchange="addToCart(${product.id}, this.value)">

                                </div>

                                <svg class="w-5 h-5 text-red-500 shrink-0 cursor-pointer" onclick="deleteProductInCart(${product.id})">
                                        <use href="#delete"></use>
                                    </svg>
                                </div>
                               
                            </li>
                
                `)
        })

        allPrice = cart.reduce((acc, product) => {
            return acc + (product.price * product.count);
        }, 0)
        totalAmountElem.innerHTML = allPrice.toLocaleString('fa-ir')
        sumPrice.innerHTML = allPrice.toLocaleString('fa-ir')


    } else {
        cartItemsWrapper.innerHTML = `
        <p class="my-3"> شما هنوز هیچ محصولی اضافه نکرده اید :(</p>
        `
    }
    suggestProductHandler()

}
// Remove product from cart.
const deleteProductInCart = (id) => {

    let cart = JSON.parse(localStorage.getItem('cart')) || []
    let indexProduct = cart.findIndex(product => product.id == Number(id))

    cart.splice(indexProduct, 1)
    localStorage.setItem('cart', JSON.stringify(cart))
    updateCart()
}
window.deleteProductInCart = deleteProductInCart

// Make the suggested products.
const suggestProductHandler = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    let suggestProduct = []
    let getAllCates = cart.map(product => product.category)
    let categories = [...new Set(getAllCates)]
    if (categories.length) {
        suggestProduct = products.filter(product => {
            if (categories.some(cate => cate == product.category)) {
                return product
            }

        })

    } else {
        for (let index = 0; index < 10; index++) {

            suggestProduct.push(products[index])
        }
    }

    if (suggestProduct.length < 10) {
        let length = 10 - suggestProduct.length
        for (let index = 0; index < length; index++) {
            suggestProduct.push(products[index])
        }
    }

    swiperWrapper.innerHTML = ''
    suggestProduct.forEach(product => {
        swiperWrapper.insertAdjacentHTML('beforeend', `
         <div class="swiper-slide ">
                                <!-- box product -->
                                <div
                                    class="bg-gray-100 dark:bg-gray-800  rounded-xl overflow-hidden py-2 px-4 relative w-full">

                                    <div class="max-w-[270px] max-h-[180px] mx-auto rounded overflow-hidden ">
                                        <img src="../${product.image}" class="w-full h-full object-cover">
                                    </div>
                                    <p class="font-bold mt-3 line-clamp-2 h-12" >
${product.title}
                                    </p>
                                    <p class="my-2 line-clamp-2 text-gray-600 dark:text-gray-400 text-sm h-10">
                                    ${product.shortDescription}
                                    </p>
                                    <div class="flex justify-between items-center">
                                        <div class="text-gray-800 dark:text-gray-100">
                                            <span class="font-bold text-2xl">${product.price}
                                            </span><span class="text-xs">تومان</span>
                                        </div>
                                        <div class="flex items-center gap-1 text-yellow-500">
                                            <svg class="w-5 h-5 ">
                                                <use href="#star"></use>
                                            </svg>
                                            <span class="pt-1 ">${product.rating}</span>

                                        </div>
                                    </div>
                                    <button
                                        class="mr-auto mt-2 bg-green-400 text-white size-10 rounded-xl flex  justify-center items-center cursor-pointer" onclick="addToCart('${product.id}')">
                                        <svg class="w-6 h-6">
                                            <use href="#cart"></use>
                                        </svg>
                                    </button>


                                </div>
                            </div>
        
        `)
    })

    swiper.update()

}

const submitOfferHandler = () => {
    if (inputOffer.value.trim() == 'mobin') {
        massage(true, 'کد تخفیف با موفقیت ثبت شد نوش جونت :)')
        sumPrice.innerHTML = (allPrice - (allPrice * .2)).toLocaleString('fa-ir')
        offerAmountElem.innerHTML = (allPrice * .2).toLocaleString('fa-ir')
        inputOffer.value = ''

    } else {
        massage(false, 'کدی که وارد کردید معتبر نمی باشد.')
    }
}

//--------------------------------------------events
window.addEventListener('load', () => {
    let isLogin = localStorage.getItem('isLogin') || 'false'
    if (isLogin === 'false') {
        window.location.href = 'login.html'
    }

    nameInput.value = `${user.name} ${user.lastName}`
    typeOffer()
    updateCart()
    suggestProductHandler()
    removeLoadgin()


})
submitOffer.addEventListener('click', submitOfferHandler)
swiperEl.addEventListener('mouseenter', () => {
    swiper.autoplay.stop();
});
swiperEl.addEventListener('mouseleave', () => {
    swiper.autoplay.start();
});
offerBtn.addEventListener('click', showOfferWrapper)
payBtn.addEventListener('click', () => {
    massage(false, 'متاسفانه درگاه پرداخت پاسخگو نیست')
})
factureBtn.addEventListener('click', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    if (cart.length) {
        window.location.href = 'facture.html'
    } else {
        massage(false, 'محصولی در سبد شما نمی باشد برای پیش فاکتور')
    }
})