import { removeLoadgin, isLoginUser, getUserInfo, getAllCategory, products } from "./utils.js"
//--------------------------------------------Variables
const darkModeBtn = document.querySelector('#dark-mode-btn')
const loginBtn = document.querySelector('.login-btn')
const panelUserBtnWrapper = document.querySelector('.panel-user-btn-wrapper')
const panelUserBtn = document.querySelector('.panel-user-btn')
const panelUserName = document.querySelector('#panel-user-name')
const logOutBtn = document.querySelector('.log-out-btn')
const userPanelWrapper = document.querySelector('.user-panel-wrapper')
const blurEffect = document.querySelector('.blur-effect')
const cartWrapper = document.querySelector('.cart-wrapper')
const cartBtn = document.querySelector('.cart-btn')
const cartListWrapper = document.querySelector('.cart-list-wrapper')
const cartWrapperCloseBtn = document.querySelector('#cart-wrapper-close-btn')
const searchMobileBtnWrapper = document.querySelector('.search-mobile-btn-wrapper')
const searchMobileBtn = document.querySelector('.search-mobile-btn')
const searchMobileWrapper = document.querySelector('.search-mobile-wrapper')
const searchMobileClsoeBtn = document.querySelector('.search-mobile-close-btn')
const sidebarBtns = document.querySelectorAll('.sidebar-btn')
const categoryWrapper = document.querySelector('.category-wrapper')
const sortItems = document.querySelectorAll('[name="sort"]')
const pagingWrapper = document.querySelector('.paging-wrapper')
const productWrapper = document.querySelector('.product-wrapper')
let allProducts = products
const cartCountElm = document.querySelector('.cart-count')
const cartItemsWrapper = document.querySelector('.cart-items-wrapper')
const cartFooterWrapper = document.querySelector('.cart-footer')
const myCartCountElm = document.querySelector('#my-cart-count')
const amountCart = document.querySelector('.amount')
const goShopingCartBtn = document.querySelector('.go-cart-btn')
const searchInputPc = document.querySelector('.search-pc-input')
const searchPcBtn = document.querySelector('.search-pc-btn')
const searchInputMObile = document.querySelector('.search-mobile-input')
const searchBtnMobile = document.querySelector('.search-btn-mobile')

//--------------------------------------------Functions
// Checks for dark mode and changes the theme accordingly.
const darkModeStatusHandler = () => {
    let theme = localStorage.getItem('theme') || 'light'
    if (theme === 'light') {
        localStorage.setItem('theme', 'dark')
    } else {
        localStorage.setItem('theme', 'light')
    }
    darkModeHandler()
}
// Checks if the user is logged in and fills all fields with user information.
const createPageHandler = () => {
    let isLogin = isLoginUser()
    if (isLogin) {
        let user = getUserInfo()
        panelUserName.innerHTML = user.name
        panelUserBtnWrapper.classList.remove('hidden')
        loginBtn.classList.add('hidden')
    } else {
        panelUserBtnWrapper.classList.add('hidden')
        loginBtn.classList.remove('hidden')

    }
}
// Logs out the user.
const logoutHandler = () => {
    localStorage.setItem('isLogin', false)
    localStorage.setItem('user', JSON.stringify({}))
    window.location.reload()

}
// The user opens and closes the panel.
const userPanelHandler = (action) => {

    if (action === 'open') {
        panelUserBtnWrapper.classList.add('z-40')
        blurEffect.classList.remove('hidden')
        userPanelWrapper.classList.remove('hidden')
    } else {
        panelUserBtnWrapper.classList.remove('z-40')
        blurEffect.classList.add('hidden')
        userPanelWrapper.classList.add('hidden')
    }
}
// Opens and closes the shopping cart.
const cartPanelHandler = (action) => {

    if (action === 'open') {
        cartWrapper.classList.add('z-40')
        blurEffect.classList.remove('hidden')
        cartListWrapper.classList.remove('hidden')
    } else {
        cartWrapper.classList.remove('z-40')
        blurEffect.classList.add('hidden')
        cartListWrapper.classList.add('hidden')
    }
}
//  Opens and closes the search mobile Wrapper
const searchMobileHandler = (action) => {

    if (action === 'open') {
        blurEffect.classList.remove('hidden')
        searchMobileWrapper.classList.remove('hidden')
    } else {
        blurEffect.classList.add('hidden')
        searchMobileWrapper.classList.add('hidden')
    }
}
// Opens and closes sidebars.
const sidebarHandler = (btn) => {
    btn.classList.toggle('rotate-180')
    btn.parentElement.classList.toggle('pb-2')
    btn.parentElement.classList.toggle('border-b')
    btn.parentElement.nextElementSibling.classList.toggle('hidden')
}
// Create category items
const createCategories = () => {
    categoryWrapper.innerHTML = ''

    let categories = getAllCategory()
    categories.forEach(cate => {
        categoryWrapper.insertAdjacentHTML('beforeend', `
            <li>
                            <label for="${cate}" class="flex items-center gap-2">
                                <input type="checkbox"  id="${cate}" class="opacity-0 input-category" onchange="categorySearchHandler(event,'${cate}')">
                                <div class="w-4 h-4 rounded bg-gray-200 transition-all"></div>
                                ${cate}
                            </label>
                        </li>
            `)
    })
}
// Add or remove selected categories to the address.
const categorySearchHandler = (event, searchValue) => {
    let url = new URL(window.location)
    let all = url.searchParams.getAll('cate')
    if (event.target.checked) {
        all.push(searchValue)
    } else {
        all = all.filter(item => item !== searchValue);
    }
    url.searchParams.delete('cate');
    url.searchParams.delete('page');
    all.forEach(item => url.searchParams.append('cate', item));
    window.history.replaceState({}, '', url);
    createBoxProduct()

}
window.categorySearchHandler = categorySearchHandler;
// Write the sort type in the address bar.
const sortHandle = (value) => {

    let url = new URL(window.location)
    url.searchParams.delete('page');
    url.searchParams.set('sort', value)
    window.history.replaceState({}, '', url);
    createBoxProduct()
}
// Specify the number of pages and create the page button.
const pagination = (products) => {
    pagingWrapper.innerHTML = ''
    let countPage = Math.floor(products.length / 12) + 1
    for (let index = 0; index < countPage; index++) {
        pagingWrapper.insertAdjacentHTML('afterbegin', `
            <li
                        class=" border border-gray-300 rounded size-8 flex justify-center items-center cursor-pointer text-xl leading-8 pagination-item" id="page-${index + 1}" onclick="goToPage('${index + 1}')">
                        ${index + 1}
                    </li>
            
            `)
    }


}
// Enter the selected page in the address bar.
const goToPage = (page) => {
    let url = new URL(window.location)
    url.searchParams.set('page', page)
    window.history.replaceState({}, '', url);
    createBoxProduct()
}
window.goToPage = goToPage
// Check the categories that are active in the address bar.
const checkActiveCategories = (cates) => {
    cates.forEach(id => {
        document.getElementById(id).checked = true
    })
}
// Check the sort that are active in the address bar.
const checkActiveSort = (value) => {
    document.querySelector(`[value="${value}"]`).checked = true
}
// Change the button style on the active page.
const activePageBtn = (page) => {
    document.querySelectorAll('.pagination-item').forEach(btn => {
        btn.classList.remove('active-btn')
    })

    let activeBtn = document.getElementById(`page-${page}`)
    activeBtn.classList.add('active-btn')



}

const createBoxProduct = () => {
    let url = new URL(window.location)
    let filterProducts = []
    let cates = url.searchParams.getAll('cate')
    let sort = url.searchParams.get('sort') || 'all'
    let page = Number(url.searchParams.get('page')) || 1

    checkActiveCategories(cates)
    checkActiveSort(sort)

    if (cates.length) {
        filterProducts = allProducts.filter(product => {
            if (cates.some(cate => cate == product.category)) {
                return product
            }
        })

    } else {
        filterProducts = allProducts
    }

    if (filterProducts.length > 12) {
        pagingWrapper.classList.remove('hidden')
        pagination(filterProducts)
    } else {
        pagingWrapper.classList.add('hidden')
    }

    if (sort == 'cheapest') {
        filterProducts = filterProducts.sort((p1, p2) => p1.price - p2.price)

    } else if (sort == 'expensive') {
        filterProducts = filterProducts.sort((p1, p2) => p2.price - p1.price)

    } else if (sort == 'score') {
        filterProducts = filterProducts.sort((p1, p2) => p2.rating - p1.rating)
    } else {
        filterProducts = filterProducts.sort((p1, p2) => p1.id - p2.id)
    }




    productWrapper.innerHTML = ''
    let start = (page - 1) * 12
    let end = start + 12
    let listFinalProduct = filterProducts.slice(start, end)
    listFinalProduct.forEach(product => {
        productWrapper.insertAdjacentHTML('beforeend', `
            <!-- box product -->
                    <div
                        class="bg-white dark:bg-gray-700 rounded-xl overflow-hidden h-[366px] xl:h-96 py-2 px-4 relative">
                        <button
                            class="bg-blue-400 text-white absolute bottom-0.5 left-1.5 z-20 rounded-xl w-12 h-[73px] xl:w-[65px] xl:h-[70px] cursor-pointer flex justify-center items-center " id="product-${product.id}" onclick="addToCart('${product.id}')">
                            <svg class="w-6 h-6" >
                                <use href="#cart"></use>
                            </svg>
                        </button>
                        <div class="absolute bottom-0 left-0 w-[60px] h-20 xl:size-20 bg-gray-100 dark:bg-gray-800  rounded-tr-xl z-10 ">
                            <svg
                                class="w-[15px] h-[15px] absolute rotate-90 left-0 -top-3.5 text-gray-100 dark:text-gray-800">
                                <use href="#box"></use>
                            </svg>
                            <svg
                                class="w-[15px] h-[15px] absolute rotate-90 -bottom-[1px] -right-[15px] text-gray-100 dark:text-gray-800">
                                <use href="#box"></use>
                            </svg>

                        </div>
                        <div class="max-w-[270px] max-h-[180px] mx-auto rounded overflow-hidden ">
                            <img src="${product.image}" class="w-full h-full object-cover">
                        </div>
                        <p class="font-bold mt-3 line-clamp-2 h-12" >
                        ${product.title}
                        </p>
                        <p class="my-2 line-clamp-2 text-gray-600 dark:text-gray-400 text-sm h-10">
                        ${product.shortDescription}
                        </p>
                        <div class="text-gray-800 dark:text-gray-100"><span class="font-bold text-2xl"> ${product.price.toLocaleString("fa-IR")}
                            </span><span class="text-xs">تومان</span></div>
                        <div class="flex items-center gap-1 text-yellow-500">
                            <svg class="w-5 h-5 ">
                                <use href="#star"></use>
                            </svg>
                            <span class="pt-1 ">${product.rating}</span>


                        </div>

                    </div>
            
            `)
    })

    activePageBtn(page)

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
            massage(true, 'محصول به سبد خرید اضافه شد')
            cart[isProductInCart].count = count
        }

    } else {

        if (isProductInCart > -1) {
            let count = Number(cart[isProductInCart].count) + 1
            isBuy = isStock(findProduct.stock, count)
            if (isBuy) {
                cart[isProductInCart].count = Number(cart[isProductInCart].count) + 1
                massage(true, 'محصول به سبد خرید اضافه شد')

            }

        } else {
            isBuy = isStock(findProduct.stock, 1)
            if (isBuy) {
                findProduct.count = 1
                cart.push(findProduct)
                massage(true, 'محصول به سبد خرید اضافه شد')

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
    let allPrice = 0
    cartItemsWrapper.innerHTML = ''
    myCartCountElm.innerHTML = cart.length
    if (cart.length) {
        cartCountElm.classList.remove('hidden')
        cartCountElm.innerHTML = cart.length
        cartFooterWrapper.classList.remove('hidden')
        cart.forEach(product => {
            cartItemsWrapper.insertAdjacentHTML('beforeend', `
                <li class="flex items-center justify-between gap-1">
                                    <img src="${product.image}" class="size-20 sm:size-24 object-contain " >
                                    <div >
                                        <p class="line-clamp-2 text-sm sm:text-base"> ${product.title}</p>
                                        <p class="line-clamp-1 text-sm text-gray-500 my-1"> ${product.price.toLocaleString('fa-ir')}
                                            <span>تومان</span>
                                        </p>
                                    </div>
                                    <div class="bg-gray-100 dark:bg-gray-600 w-12  rounded p-0 relative">
                                        <input type="number" class="w-full h-full text-center " min="1"
                                            max="200" value="${product.count}" onchange="addToCart(${product.id}, this.value)">
                                        
                                    </div>

                                    <svg class="w-5 h-5 text-red-500 shrink-0 cursor-pointer" onclick="deleteProductInCart(${product.id})">
                                        <use href="#delete"></use>
                                    </svg>
                                </li>
                
                `)
        })

        allPrice = cart.reduce((acc, product) => {
            return acc + (product.price * product.count);
        }, 0)

        amountCart.innerHTML = allPrice.toLocaleString('fa-ir')

    } else {
        cartCountElm.classList.add('hidden')
        cartItemsWrapper.innerHTML = `
        <li class="my-3"> شما هنوز هیچ محصولی اضافه نکرده اید :(</li>
        `
        cartFooterWrapper.classList.add('hidden')
    }

}
// Remove product from cart.
const deleteProductInCart = (id) => {

    let cart = JSON.parse(localStorage.getItem('cart')) || []
    let indexProduct = cart.findIndex(product => product.id == Number(id))

    cart.splice(indexProduct, 1)
    localStorage.setItem('cart', JSON.stringify(cart))
    createBoxProduct()
    updateCart()
}
window.deleteProductInCart = deleteProductInCart
// Check if the user is not logged in and send them to the login page.
const goShopingCartHandler = () => {
    let isUser = isLoginUser()
    if (isUser) {
        window.location.href = 'pages/cart.html'
    } else {
        massage(false, 'لطفا ابتدا وارد شوید تا چند لحظه دیگر وارد صفحه ورود می شوید.')
        setTimeout(() => {
            window.location.href = 'pages/login.html'
        }, 3000);
    }
}

const searchHandler = (input) => {
    console.log(input);

    let searchValue = input.value.trim()
    let resultSearch = products.filter(product => {
        return product.title.toLowerCase().startsWith(searchValue);
    })

    productWrapper.innerHTML = ''
    pagingWrapper.classList.add('hidden')

    if (resultSearch.length) {
        resultSearch.forEach(product => {
            productWrapper.insertAdjacentHTML('beforeend', `
            <!-- box product -->
                    <div
                        class="bg-white dark:bg-gray-700 rounded-xl overflow-hidden h-[409px] xl:h-96 py-2 px-4 relative">
                        <button
                            class="bg-blue-400 text-white absolute bottom-0.5 left-1.5 z-20 rounded-xl w-[65px] h-[70px] cursor-pointer flex justify-center items-center " onclick="addToCart('${product.id}')">
                            <svg class="w-6 h-6" >
                                <use href="#cart"></use>
                            </svg>
                        </button>
                        <div class="absolute bottom-0 left-0 size-20 bg-gray-100 dark:bg-gray-800  rounded-tr-xl z-10 ">
                            <svg
                                class="w-[15px] h-[15px] absolute rotate-90 left-0 -top-3.5 text-gray-100 dark:text-gray-800">
                                <use href="#box"></use>
                            </svg>
                            <svg
                                class="w-[15px] h-[15px] absolute rotate-90 -bottom-[1px] -right-[15px] text-gray-100 dark:text-gray-800">
                                <use href="#box"></use>
                            </svg>

                        </div>
                        <div class="max-w-[270px] max-h-[180px] mx-auto rounded overflow-hidden ">
                            <img src="${product.image}" class="w-full h-full object-cover">
                        </div>
                        <p class="font-bold mt-3 line-clamp-2 h-12" >
                        ${product.title}
                        </p>
                        <p class="my-2 line-clamp-2 text-gray-600 dark:text-gray-400 text-sm h-10">
                        ${product.shortDescription}
                        </p>
                        <div class="text-gray-800 dark:text-gray-100"><span class="font-bold text-2xl"> ${product.price.toLocaleString("fa-IR")}
                            </span><span class="text-xs">تومان</span></div>
                        <div class="flex items-center gap-1 text-yellow-500">
                            <svg class="w-5 h-5 ">
                                <use href="#star"></use>
                            </svg>
                            <span class="pt-1 ">${product.rating}</span>


                        </div>

                    </div>
            
            `)
        })
    } else {
        productWrapper.innerHTML = `
        <p>متاسفانه محصولی یافت نشد </p>
        `
    }



}

//--------------------------------------------Events

window.addEventListener('load', () => {
    let widthWindow = window.innerWidth
    if (widthWindow < 1024) {
        sidebarBtns.forEach(btn => {
            console.log(btn);
            sidebarHandler(btn)
        })
    }
    createCategories()
    createPageHandler()
    pagination(allProducts)
    createBoxProduct()
    updateCart()
    removeLoadgin()
})

darkModeBtn.addEventListener('click', darkModeStatusHandler)
logOutBtn.addEventListener('click', logoutHandler)
panelUserBtn.addEventListener('click', () => {
    userPanelHandler('open')
})
blurEffect.addEventListener('click', () => {
    userPanelHandler('close')
})

cartBtn.addEventListener('click', () => {
    cartPanelHandler('open')
})
cartWrapperCloseBtn.addEventListener('click', () => {
    cartPanelHandler('close')
})
blurEffect.addEventListener('click', () => {
    cartPanelHandler('close')
})
searchMobileBtn.addEventListener('click', () => {
    searchMobileHandler('open')
})
searchMobileClsoeBtn.addEventListener('click', () => {
    searchMobileHandler('close')
})
sidebarBtns.forEach(btn => {
    btn.addEventListener('click', event => {
        sidebarHandler(event.target)
    })
})

sortItems.forEach(sortBtn => {
    sortBtn.addEventListener('change', event => {
        sortHandle(event.target.value)
    })
})

goShopingCartBtn.addEventListener('click', goShopingCartHandler)
searchPcBtn.addEventListener('click', () => searchHandler(searchInputPc))
searchBtnMobile.addEventListener('click', () => searchHandler(searchInputMObile))



