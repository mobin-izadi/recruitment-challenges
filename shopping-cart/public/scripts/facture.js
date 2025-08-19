const factureWrapper = document.querySelector('.facture-wrapper')
const totalPriceElem = document.querySelector('.total-price')
const printBtn = document.querySelector('.print-btn')
const factureTable = document.querySelector("table");



window.addEventListener('load', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    factureWrapper.innerHTML = ''
    allPrice = cart.reduce((acc, product) => {
        return acc + (product.price * product.count);
    }, 0)
    totalPriceElem.innerHTML = `${allPrice.toLocaleString('fa-ir')} تومان`
    cart.forEach((product, index) => {
        factureWrapper.insertAdjacentHTML('beforebegin', `

              <tr class="border-b">
                            <td class="px-3 py-2 text-center">${index + 1}</td>
                            <td class="px-3 py-2 bg-gray-50 whitespace-normal break-words">
                            ${product.title}
                            </td>
                            <td class="px-3 py-2 text-center">  ${product.count}</td>
                            <td class="px-3 py-2 bg-gray-50 text-center">${product.price.toLocaleString('fa-ir')} تومان</td>
                            <td class="px-3 py-2 text-center">${(product.count * product.price).toLocaleString('fa-ir')} تومان</td>
                        </tr>
           
            `)
    })
})

printBtn.addEventListener("click", () => {
    window.print()
});